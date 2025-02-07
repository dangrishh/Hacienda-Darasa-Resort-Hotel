// src/models/Inquiry.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  fullName: string;
  contactNumber: string;
  email: string;
  fbAccount: string;
  messages: string;
}

const InquirySchema = new Schema<IInquiry>({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  fbAccount: { type: String, required: true },
  messages: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IInquiry>('Inquiry', InquirySchema);