import mongoose, { Schema, Document } from "mongoose";

interface IRoom {
  name: string;
  details: mongoose.Types.ObjectId;
  booked: boolean;
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

interface IRoomDetails extends Document {
  name: string;
  rates: IRoomRate[]; // Multiple rate options
  extraPersonCharge: number;
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}


interface IRoomDocument extends IRoom, Document {}

const RoomSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    details: { type: Schema.Types.ObjectId, ref: "RoomDetails", required: true },
    booked: { type: Boolean, default: false },
    bookedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
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
        duration: { type: Number, required: true }, // Example: "12 hours"
        price: { type: Number, required: true }, // Example: 2000
        maxPersons: { type: Number, required: true }, // Example: 2
      },
    ],
    extraPersonCharge: { type: Number, required: true },
    amenities: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Room = mongoose.model<IRoomDocument>("Room", RoomSchema);
export const RoomDetails = mongoose.model<IRoomDetails>('RoomDetails', RoomDetailsSchema);
