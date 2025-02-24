import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserStaff from '../models/StaffUsers';
import mongoose from 'mongoose';
import { Booking } from '../models/Bookings';
import {Room} from '../models/Rooms';

export const bookReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, room, name, contactNumber, email, checkInDate, checkOutDate, numOfGuests, totalPrice } = req.body;

    // ✅ Validate required fields
    if (!user || !room || !name || !contactNumber || !email || !checkInDate || !checkOutDate || !numOfGuests || !totalPrice) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    // ✅ Check if the room exists
    const existingRoom = await Room.findById(room);
    if (!existingRoom) {
      res.status(404).json({ error: "Room not found" });
      return;
    }

    // ✅ Check if the room is available (free)
    if (existingRoom.booked !== "free") {
      res.status(400).json({ error: "Room is not available for booking" });
      return;
    }

    // ✅ Proceed with booking
    const newBooking = new Booking({
      user,
      room,
      name,
      contactNumber,
      email,
      checkInDate,
      checkOutDate,
      numOfGuests,
      totalPrice,
      bookStatus: "pending",
      paymentStatus: "pending",
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking successful!", data: newBooking });

  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

  export const getBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all bookings with user, room, and room details populated
        const bookings = await Booking.find();

        res.status(200).json({ bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ success: false, error: "Failed to fetch bookings" });
    }
};

export const getBookingById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Validate the booking ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ success: false, error: "Invalid booking ID format" });
            return;
        }

        // Fetch the booking with populated details
        const booking = await Booking.findById(id)
        .populate({
            path: "user",
            model: "CustomerUser", // ✅ Ensure this matches your model
            select: "fullname email contactNumber"
        })
        .populate({
            path: "room",
            populate: { path: "details" }
        });

        if (!booking) {
            res.status(404).json({ success: false, error: "Booking not found" });
            return;
        }

        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ success: false, error: "Failed to fetch booking" });
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

      // ✅ Find the room before updating
      const room = await Room.findById(booking.room);
      if (!room) {
        res.status(404).json({ message: "Associated room not found" });
        return;
      }
  
      // Update room status if applicable
      if (newStatus === "ongoing") {
        await Room.findByIdAndUpdate(booking.room, {
          booked: "occupied",
          bookedBy: booking.user,
          bookingStartTime: booking.checkInDate,
          bookingEndTime: booking.checkOutDate,
        });
      } 
      else if (newStatus === "confirmed") {
        await Room.findByIdAndUpdate(booking.room, {
          booked: "reserved",
          bookedBy: null,
          bookingStartTime: null,
          bookingEndTime: null,
        });
      }
      else if (newStatus === "completed") {
        await Room.findByIdAndUpdate(booking.room, {
          booked: "free",
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


export const getBookingPrice = async (req: Request, res: Response): Promise<void> => {
    try {
      const { bookingId } = req.params;
  
      // Find the booking by ID
      const booking = await Booking.findById(bookingId).populate("room");
  
      if (!booking) {
        res.status(404).json({ success: false, error: "Booking not found" });
        return;
      }
  
      res.status(200).json({
        success: true,
        message: "Booking price retrieved successfully",
        data: {
          bookingId: booking._id,
          user: booking.user,
          name: booking.name,
          contactNumber: booking.contactNumber,
          email: booking.email,
          room: booking.room,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          numOfGuests: booking.numOfGuests,
          totalPrice: booking.totalPrice, // Already stored in DB
          bookStatus: booking.bookStatus,
          paymentStatus: booking.paymentStatus,
        },
      });
  
    } catch (error) {
      console.error("Error retrieving booking price:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  