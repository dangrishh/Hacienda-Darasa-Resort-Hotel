// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IAdminUsers extends Document {
  fullname: string;
  email: string;
  password: string;
  isApproved: boolean;
}

const AdminSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, // Optional flag for approval
  },
  { timestamps: true }
);

export default mongoose.model<IAdminUsers>('AdminUsers', AdminSchema);

