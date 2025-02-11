// src/models/AdminUsers.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IAdminUsers extends Document {
  fullname: string;
  email: string;
  password: string;
}
interface ICategory extends Document {
  name: string;
  quantity: number;
  totalPax: number;
  checkIn: Date;
  checkOut: Date;
  rate: number;
  amenities: string[];
}

const AdminUsersSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    totalPax: { type: Number, required: true }, // Added total pax field
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    rate: { type: Number, required: true },
    amenities: { type: [String], required: true },
  },
  { timestamps: true }
);
 
export const AdminUsers = mongoose.model<IAdminUsers>('AdminUsers', AdminUsersSchema);
export const Category = mongoose.model<ICategory>('Category', CategorySchema);
