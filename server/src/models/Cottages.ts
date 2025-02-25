import mongoose, { Schema, Document } from 'mongoose';

interface ICottages extends Document {
    name: string;
    quantity: number;
    price: number;
    images: string[];
  }
  
  const CottagesSchema = new Schema<ICottages>(
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      images: { type: [String], required: false },
    },
    { timestamps: true }
  );
  
export const Cottages = mongoose.model<ICottages>('Cottages', CottagesSchema);
  