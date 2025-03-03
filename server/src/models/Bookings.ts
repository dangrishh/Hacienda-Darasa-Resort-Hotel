// src/models/Inquiry.ts
import mongoose, { Schema, Document } from 'mongoose';
import {CostumerUser} from '../models/CostumerUsers';

export interface IInquiry extends Document {
  fullName: string;
  contactNumber: string;
  email: string;
  fbLink: string;
  messages: string;
}

export interface IBooking extends Document {
  user: mongoose.Schema.Types.ObjectId;  // Reference to User
  room: mongoose.Schema.Types.ObjectId;  // Reference to Room
  name: string;
  contactNumber: string;
  email: string;
  checkInDate: Date;
  checkOutDate: Date;
  numOfGuests: number;
  totalPrice: number;
  reservationType: "12hrs" | "22hrs" | "custom"; // Type of reservation
  bookStatus: "pending" | "confirmed" | "canceled" | "completed";
  paymentStatus: "pending" | "paid" | "cancelled"; // Payment status
  createdAt: Date;
  updatedAt: Date;
  // Fields used only for staff-managed bookings
  staffManaged?: boolean;  // true if booked by staff
  staffId?: mongoose.Schema.Types.ObjectId; // Reference to Staff
}

const InquirySchema = new Schema<IInquiry>({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  fbLink: { type: String, required: true },
  messages: { type: String, required: true }
}, { timestamps: true });
  
  const BookingSchema = new Schema<IBooking>(
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
      name: { type: String, required: true },
      contactNumber: { type: String, required: true },
      email: { type: String, required: true },
      checkInDate: { type: Date, required: true },
      checkOutDate: { type: Date, required: true },
      numOfGuests: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      reservationType: { 
        type: String, 
        enum: ["12hrs", "22hrs", "custom"], 
        required: true 
      },
      bookStatus: {
        type: String,
        enum: ["pending", "confirmed", "canceled", "completed", "ongoing"],
      },
      paymentStatus: { 
        type: String, 
        enum: ["pending", "paid", "cancelled"], 
        default: "pending" 
      },
      staffManaged: { type: Boolean, default: false }, // If booked by staff, set to true
      staffId: { type: Schema.Types.ObjectId, ref: "Staff", default: null }, // Null if not staff-managed
    },
    { timestamps: true } // Automatically add createdAt & updatedAt
  );

// Prevent model overwrite error by checking if the model already exists
export const Inquiry = mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
export const Booking = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);