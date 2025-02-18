// src/models/AdminUsers.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IAdminUsers extends Document {
  fullname: string;
  email: string;
  password: string;
}

const AdminUsersSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
 
export const AdminUsers = mongoose.model<IAdminUsers>('AdminUsers', AdminUsersSchema);
