// src/models/AdminUsers.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IAdminUsers extends Document {
  fullname: string;
  email: string;
  password: string;
}
interface IRoom extends Document {
  name: string;
  roomNumbers: number[];
  quantity: number;
  rate: number;
  extraPersonCharge: number;
  checkIn: string;
  checkOut: string;
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

const RoomSchema: Schema = new Schema(
  {
      name: { type: String, required: true, unique: true },
      roomNumbers: { type: [Number], required: true }, // Example: [203, 204, 205, 206, 207, 208, 209]
      quantity: { type: Number, required: true },
      rate: { type: Number, required: true },
      extraPersonCharge: { type: Number, required: true },
      checkIn: { type: String, required: true },
      checkOut: { type: String, required: true },
      amenities: { type: [String], required: true },
  },
  { timestamps: true }
);
 
export const AdminUsers = mongoose.model<IAdminUsers>('AdminUsers', AdminUsersSchema);
export const Room = mongoose.model<IRoom>('Room', RoomSchema);
