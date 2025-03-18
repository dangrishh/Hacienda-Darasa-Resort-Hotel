import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserStaff from '../models/StaffUsers';
import mongoose from 'mongoose';
import { Booking } from '../models/Bookings';
import {Room, RoomDetails, IRoomDetails} from '../models/Rooms';
import { execSync } from 'child_process';
import { differenceInHours, addHours, addDays, set , differenceInMinutes} from "date-fns";



const calculateCheckoutDate = (checkInDate: Date, reservationType: string): Date => {
  let checkoutDate = new Date(checkInDate);
  console.log("[DEBUG] Check-in:", checkoutDate.toISOString());

  if (reservationType === "22hrs") {
    if (checkoutDate.getUTCHours() < 14) {
      console.log("[DEBUG] Early check-in detected, setting checkout to 12 PM UTC next day.");
      checkoutDate = addDays(set(checkoutDate, { hours: 12, minutes: 0, seconds: 0 }), 1);
      
      // Convert to UTC explicitly
      checkoutDate = new Date(Date.UTC(
        checkoutDate.getUTCFullYear(),
        checkoutDate.getUTCMonth(),
        checkoutDate.getUTCDate(),
        12, 0, 0 // Ensure it's 12 PM UTC
      ));
    } else {
      console.log("[DEBUG] Standard 22-hour checkout.");
      checkoutDate = addHours(checkoutDate, 22);
    }
  } else if (reservationType === "12hrs") {
    checkoutDate = addHours(checkoutDate, 12);
  } else {
    throw new Error("Invalid reservation type");
  }

  console.log("[DEBUG] Calculated Check-out:", checkoutDate.toISOString());
  return checkoutDate;
};


const calculateExtraHourCharge = (checkInDate: Date, hourlyRate: number): number => {
  if (!hourlyRate || isNaN(hourlyRate)) {
    console.error("[ERROR] Invalid hourly rate:", hourlyRate);
    throw new Error("Hourly rate is missing or invalid");
  }

  console.log(`[DEBUG] Original Check-in Date: ${checkInDate.toISOString()}`);
  console.log(`[DEBUG] Check-in Hour (Local): ${checkInDate.getHours()}`);
  console.log(`[DEBUG] Check-in Hour (UTC): ${checkInDate.getUTCHours()}`);

  if (checkInDate.getUTCHours() < 14) {  // Charge only for check-ins before 2 PM UTC
    const extraHours = 14 - checkInDate.getUTCHours(); // Calculate extra hours before 2 PM
    const extraCharge = extraHours * hourlyRate;

    console.log(`[DEBUG] Extra Hours: ${extraHours}, Extra Hour Charge: ${extraCharge}`);
    return extraCharge;
  }
  return 0;
};




// ✅ Function to calculate total price with detailed breakdown
const calculateTotalPrice = async (
  roomId: string,
  checkInDate: Date,
  reservationType: string,
  numOfGuests: number
): Promise<{ totalPrice: number; extraHourCharge: number; extraPersonCharge: number; checkOutDate: Date }> => {
  const room = await Room.findById(roomId).populate<{ details: any }>("details");
  if (!room) throw new Error("Room not found");

  // ✅ Get room price and max persons based on reservation type
  const rateDetails = room.details.rates;
  let roomPrice = 0;
  let maxPersons = 0;

  for (let rate of rateDetails) {
    if (rate.duration === reservationType) {
      roomPrice = rate.price;
      maxPersons = rate.maxPersons;
      break;
    }
  }

  if (!roomPrice) {
    console.error("[ERROR] Room price not found for reservation type:", reservationType);
    throw new Error("Invalid reservation type for this room");
  }

  // ✅ Calculate extra charges
  const extraGuests = numOfGuests > maxPersons ? numOfGuests - maxPersons : 0;
  const extraPersonCharge = extraGuests * room.details.extraPersonCharge;
  
  let extraHourCharge = 0;
  if (reservationType === "22hrs") {
    try {
      extraHourCharge = calculateExtraHourCharge(checkInDate, room.details.extraHourCharge?.[0]?.price);
    } catch (error) {
      console.error("[ERROR] Failed to calculate extra hour charge:", error);
      extraHourCharge = 0; // Fallback to 0 to prevent crashes
    }
  }

  // ✅ Compute check-out date
  const checkOutDate = calculateCheckoutDate(checkInDate, reservationType);

  // ✅ Debugging logs
  console.log(`[DEBUG] Room Price: ${roomPrice}`);
  console.log(`[DEBUG] Extra Person Charge: ${extraPersonCharge}`);
  console.log(`[DEBUG] Extra Hour Charge: ${extraHourCharge}`);
  console.log(`[DEBUG] Total Price Calculation: ${roomPrice} + ${extraPersonCharge} + ${extraHourCharge}`);

  return { 
    totalPrice: roomPrice + extraPersonCharge + extraHourCharge, 
    extraHourCharge, 
    extraPersonCharge, 
    checkOutDate 
  };
};

// ✅ API Endpoint to Get Booking Cost
export const getBookingCost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { room, checkInDate, reservationType, numOfGuests } = req.body;

    if (!room || !checkInDate || !reservationType || !numOfGuests) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const checkIn = new Date(checkInDate);
    const { totalPrice, extraHourCharge, extraPersonCharge, checkOutDate } = await calculateTotalPrice(room, checkIn, reservationType, numOfGuests);

    res.status(200).json({
      message: "Booking cost calculated successfully!",
      TotalPrice: totalPrice,
      ExtraHourCharge: extraHourCharge > 0 ? `Extra charge for early check-in: PHP ${extraHourCharge}` : "No early check-in charge",
      ExtraPersonCharge: extraPersonCharge > 0 ? `Extra charge for additional guests: PHP ${extraPersonCharge}` : "No extra guest charge",
      CheckOutDate: checkOutDate,
    });

  } catch (error: unknown) {
    console.error("Price Calculation Error:", error);

    res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
  }
};



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

    const existingRoom = await Room.findById(room);
    if (!existingRoom) {
      res.status(404).json({ error: "Room not found" });
      return;
    }

    if (existingRoom.booked !== "free") {
      res.status(400).json({ error: "Room is not available for booking" });
      return;
    }

    const checkIn = new Date(checkInDate);
    const { totalPrice, extraHourCharge, extraPersonCharge, checkOutDate } = await calculateTotalPrice(room, checkIn, reservationType, numOfGuests);

    // ✅ Save booking details to database
    const newBooking = new Booking({
      user,
      room,
      // redundant, because userId of client 
      // name,
      // contactNumber, 
      // email,
      checkInDate: checkIn,
      checkOutDate,
      reservationType,
      numOfGuests, // extraCharge person??
      totalPrice,
      extraHourCharge,
      extraPersonCharge, // redundant
      bookStatus: "pending"
    });

    await newBooking.save();

    // ✅ Update room status to "booked"
    existingRoom.booked = "reserved";
    await existingRoom.save();

    res.status(201).json({
      message: "Booking successful!",
      ReservationType: reservationType,
      CheckIn: checkIn,
      CheckOut: checkOutDate,
      TotalPrice: totalPrice,
      ExtraHourCharge: extraHourCharge > 0 ? `Extra charge for early check-in: PHP ${extraHourCharge}` : "No early check-in charge",
      ExtraPersonCharge: extraPersonCharge > 0 ? `Extra charge for additional guests: PHP ${extraPersonCharge}` : "No extra guest charge",
      BookStatus: "pending"
    });

  } catch (error: unknown) {
    console.error("Booking error:", error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
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
          bookedBy: booking.user,
          bookingStartTime: booking.checkInDate,
          bookingEndTime: booking.checkOutDate,
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

