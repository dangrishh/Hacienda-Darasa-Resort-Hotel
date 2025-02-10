// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IStaffUsers extends Document {
  fullname: string;
  email: string;
  password: string;
  isApproved: boolean;
}

const StaffSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, // Optional flag for approval
  },
  { timestamps: true }
);

export default mongoose.model<IStaffUsers>('StaffUsers', StaffSchema);

