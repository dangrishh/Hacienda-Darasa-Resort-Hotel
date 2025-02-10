// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ICostumerUsers extends Document {
  fullname: string;
  facebookLink: string;
  email: string;
  contactNumber: string;
  password: string;
}

const CostumerUsersSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true },
    facebookLink: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICostumerUsers>('ClientUsers', CostumerUsersSchema);
