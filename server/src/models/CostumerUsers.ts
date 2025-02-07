// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IClientUsers extends Document {
  fullname: string;
  facebookName: string;
  email: string;
  contactNumber: string;
  password: string;
  isApproved: boolean;
}

const ClientUsersSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true },
    facebookName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    password: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, // Optional flag for approval
  },
  { timestamps: true }
);

export default mongoose.model<IClientUsers>('ClientUsers', ClientUsersSchema);
