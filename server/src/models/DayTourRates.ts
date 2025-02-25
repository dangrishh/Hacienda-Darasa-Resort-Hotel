import mongoose, { Schema, Document } from 'mongoose';

interface IDayTourRates extends Document {
  roomType: string;
  price: number;
  images: string[];
}

const DayTourRatesSchema: Schema = new Schema(
  {
    roomType: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: false }, // Optional images
  },
  { timestamps: true }
);

export const DayTourRates = mongoose.models.DayTourRates || mongoose.model<IDayTourRates>('DayTourRates', DayTourRatesSchema);
