import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserStaff from '../models/StaffUsers';
import mongoose from 'mongoose';
import { Booking } from '../models/Bookings';
import {Room} from '../models/Rooms';

// Register Controller
export const registerStaffUser = async (req: Request, res: Response): Promise<void> => {
    const { fullname, email, password } = req.body;

    try {
        // Check if the user already exists
        const staffExists = await UserStaff.findOne({ email });
        if (staffExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserStaff({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
};

// Login Controller
export const loginStaffUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const staff = await UserStaff.findOne({ email });
        if (!staff) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        // Check if the account is approved
        if (!staff.isApproved) {
            res.status(403).json({ message: 'Account not approved. Please wait for admin approval.' });
            return;
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { staffId: staff._id },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
};

export const updatePaymentStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { bookingId } = req.params; // Get booking ID from URL
      const { paymentStatus } = req.body; // Get new status from request body
  
      // Validate input
      if (!["paid", "failed"].includes(paymentStatus)) {
        res.status(400).json({ success: false, error: "Invalid payment status" });
        return;
      }
  
      // Find and update booking
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { paymentStatus },
        { new: true } // Return updated document
      );
  
      if (!updatedBooking) {
        res.status(404).json({ success: false, error: "Booking not found" });
        return;
      }
  
      res.status(200).json({
        success: true,
        message: "Payment status updated",
        data: updatedBooking,
      });
  
    } catch (error) {
      console.error("Error updating payment status:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  export const updateBookingStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { bookingId } = req.params;
  
      // Find the booking
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        res.status(404).json({ message: "Booking not found" });
        return;
      }
  
      // Check if payment is completed
      if (booking.paymentStatus !== "paid") {
        res.status(400).json({ message: "Payment must be completed first" });
        return;
      }
  
      const currentDate = new Date();
  
      // Determine booking status
      let newStatus: "pending" | "confirmed" | "canceled" | "completed" | "ongoing" = "pending";
      
      if (currentDate >= booking.checkInDate && currentDate <= booking.checkOutDate) {
        newStatus = "ongoing";
      } else if (currentDate > booking.checkOutDate) {
        newStatus = "completed";
      } else {
        newStatus = "confirmed"; // Future bookings with payment complete
      }
  
      // Update booking
      booking.bookStatus = newStatus;
      await booking.save();
  
      // Update room status if applicable
      if (newStatus === "ongoing") {
        await Room.findByIdAndUpdate(booking.room, {
          booked: true,
          bookedBy: booking.user,
          bookingStartTime: booking.checkInDate,
          bookingEndTime: booking.checkOutDate,
        });
      } else if (newStatus === "completed") {
        await Room.findByIdAndUpdate(booking.room, {
          booked: false,
          bookedBy: null,
          bookingStartTime: null,
          bookingEndTime: null,
        });
      }
  
      res.status(200).json({ message: "Booking status updated", booking });
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };