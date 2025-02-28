import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserStaff from '../models/StaffUsers';
import mongoose from 'mongoose';
import { Booking } from '../models/Bookings';
import {Room, RoomDetails, IRoomDetails} from '../models/Rooms';


export const bookCustomerReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, room, name, contactNumber, email, checkInDate, reservationType, numOfGuests } = req.body;

    if (!user || !room || !name || !contactNumber || !email || !checkInDate || !reservationType || !numOfGuests) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (!["12hrs", "22hrs"].includes(reservationType)) {
      res.status(400).json({ error: "Invalid reservation type for customers" });
      return;
    }

    const existingRoom = await Room.findById(room).populate<{ details: IRoomDetails }>("details");
    if (!existingRoom) {
      res.status(404).json({ error: "Room not found" });
      return;
    }

    if (existingRoom.booked !== "free") {
      res.status(400).json({ error: "Room is not available for booking" });
      return;
    }

    // ✅ Convert check-in date to a Date object
    const checkIn = new Date(checkInDate);
    let checkOutDate: Date | null = null;
    let extraCharge = 0;

    // ✅ Calculate checkout time normally by adding hours (NO fixed times)
    if (reservationType === "12hrs") {
      checkOutDate = new Date(checkIn.getTime() + 12 * 60 * 60 * 1000);
    } else if (reservationType === "22hrs") {
      checkOutDate = new Date(checkIn.getTime() + 22 * 60 * 60 * 1000);
    }

    // ✅ Determine if early check-in applies (before 2:00 PM)
    const standardCheckInTime = new Date(checkIn);
    standardCheckInTime.setHours(14, 0, 0, 0); // 2:00 PM

    if (checkIn.getHours() < 14) {
      const extraHourCharge = existingRoom.details?.extraHourCharge[0]; // Get extra charge details

      if (extraHourCharge) {
        const firstHours = extraHourCharge.firstHours ?? 0; // Allowed extra hours before charge applies
        const extraHourRate = extraHourCharge.price ?? 0; // Price per extra hour

        // Calculate extra hours (only count hours before 2:00 PM)
        const extraHours = Math.ceil((standardCheckInTime.getTime() - checkIn.getTime()) / (60 * 60 * 1000));

        // Apply extra hour charge logic
        if (extraHours > firstHours) {
          extraCharge = extraHours * extraHourRate;
        } else {
          extraCharge = extraHourRate;
        }
      }
    }

    let roomPrice = 0;

    for (let i = 0; i < existingRoom.details.rates.length; i++)
    {
      if (existingRoom.details.rates[i].duration == reservationType)
      {
        roomPrice = existingRoom.details.rates[i].price;
      }
    }

    // ✅ Calculate total price with extra charges
    const totalPrice = roomPrice + extraCharge;

    /*
    // ✅ Save booking to database (example schema)
    const newBooking = new Booking({
      user,
      room,
      name,
      contactNumber,
      email,
      checkInDate: checkIn,
      checkOutDate,
      reservationType,
      numOfGuests,
      totalPrice,
      extraCharge: extraCharge > 0 ? `Extra charge: ${extraCharge}` : "No extra charge",
      bookStatus: "pending"
    });

    await newBooking.save();
    */


    res.status(201).json({
      message: "Booking successful!",
      ReservationType: reservationType,
      CheckIn: checkIn,
      CheckOut: checkOutDate,
      TotalPrice: totalPrice,
      ExtraCharge: extraCharge > 0 ? `Extra charge: ${extraCharge}` : "No extra charge",
      BookStatus: "pending"
    });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

  