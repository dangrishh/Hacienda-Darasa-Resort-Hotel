import mongoose, { Schema, Document } from "mongoose";
import {CostumerUser} from '../models/CostumerUsers';

interface IRoom {
  name: string;
  details: mongoose.Types.ObjectId;
  booked: "free" | "occupied" | "reserved";
  bookedBy?: mongoose.Types.ObjectId | null;
  bookingStartTime?: Date | null;
  bookingEndTime?: Date | null;
  pictures?: mongoose.Types.ObjectId[] | null;
}

interface IRoomRate {
  duration: number; // "12 hours" or "22 hours" 
  price: number;
  maxPersons: number; // Maximum allowed persons per rate
}

interface IHourExtension {
  firstHours: number;
  price: number;
}

export interface IRoomDetails extends Document {
  name: string;
  rates: IRoomRate[]; // Multiple rate options
  extraPersonCharge: number;
  extraHourCharge: IHourExtension[]; // For hour extensions
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}


interface IRoomDocument extends IRoom, Document {}

const RoomSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    details: { type: Schema.Types.ObjectId, ref: "RoomDetails", required: true },
    booked: { 
      type: String, 
      enum: ["free", "occupied", "reserved"],
    },
    bookedBy: { type: Schema.Types.ObjectId, ref: "CustomerUser", default: null },
    bookingStartTime: { type: Date, default: null },
    bookingEndTime: { type: Date, default: null },
    pictures: [{ type: Schema.Types.ObjectId, ref: "Picture", default: null }],
  },
  { timestamps: true }
);

const RoomDetailsSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    rates: [
      {
        duration: { type: String, required: true }, // Example: "12 hours"
        price: { type: Number, required: true }, // Example: 2000
        maxPersons: { type: Number, required: true }, // Example: 2
      },
    ],
    extraPersonCharge: { type: Number, required: true },
    extraHourCharge: [
      {
        firstHours: { type: Number, required: true },
        price: { type: Number, required: true }
      },
    ],
    amenities: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Room = mongoose.model<IRoomDocument>("Room", RoomSchema);
export const RoomDetails = mongoose.model<IRoomDetails>('RoomDetails', RoomDetailsSchema);
