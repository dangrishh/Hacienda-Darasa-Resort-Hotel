// src/models/AdminUsers.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IAdminUsers extends Document {
  fullname: string;
  email: string;
  password: string;
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

const AdminUsersSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

 
export const AdminUsers = mongoose.model<IAdminUsers>('AdminUsers', AdminUsersSchema);
export const RoomDetails = mongoose.model<IRoomDetails>('RoomDetails', RoomDetailsSchema);
