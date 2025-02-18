import mongoose, { Schema, Document } from 'mongoose';

interface ISwimRate extends Document {
  type: 'day' | 'night';
  startDate: Date;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  rates: {
    category: string;
    price: number;
  }[];
  minPax?: number; // Only for night swim
}

const SwimRateSchema = new Schema<ISwimRate>(
  {
    type: { type: String, enum: ['day', 'night'], required: true },
    startDate: { type: Date, required: true }, // Only date, no time
    startTime: { type: String, required: true }, // HH:MM format
    endTime: { type: String, required: true }, // HH:MM format
    rates: [
      {
        category: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    minPax: { type: Number, required: false }, // Only applies for night swim
  },
  { timestamps: true }
);

export const SwimRate = mongoose.model<ISwimRate>('SwimRate', SwimRateSchema);
