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
    user: mongoose.Types.ObjectId;
    name: string;
    contactNumber: string;
    email: string;
    room: mongoose.Types.ObjectId;
    checkInDate: Date;
    checkOutDate: Date;
    numOfGuests: number;
    totalPrice: number;
    bookStatus: "pending" | "confirmed" | "canceled" | "completed";
    paymentStatus: "pending" | "paid" | "failed";
    createdAt: Date;
    updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  fbLink: { type: String, required: true },
  messages: { type: String, required: true }
}, { timestamps: true });

const BookingSchema: Schema = new Schema<IBooking>(
    {
      user: { type: Schema.Types.ObjectId, ref: "CustomerUser", required: true },
      name: { type: String, required: true }, 
      contactNumber: { type: String, required: true },
      email: { type: String, required: true },
      room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
      checkInDate: { type: Date, required: true },
      checkOutDate: { type: Date, required: true },
      numOfGuests: { type: Number, required: true, min: 1 },
      totalPrice: { type: Number, required: true },
      bookStatus: {
        type: String,
        enum: ["pending", "confirmed", "canceled", "completed", "ongoing"],
        default: "pending",
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
    },
    { timestamps: true }
  );
  

// Prevent model overwrite error by checking if the model already exists
export const Inquiry = mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
export const Booking = mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);