import { Schema, model, Document } from 'mongoose';

interface IEventHall extends Document {
  name: string;
  quantity: number;
  capacity: string;
  rate: number;
  images: string[]; // Array to store image paths
}

const EventHallSchema = new Schema<IEventHall>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    capacity: { type: String, required: true },
    rate: { type: Number, required: false },
    images: { type: [String], required: false },
  },
  { timestamps: true }
);

export const EventHall = model<IEventHall>('EventHall', EventHallSchema);
