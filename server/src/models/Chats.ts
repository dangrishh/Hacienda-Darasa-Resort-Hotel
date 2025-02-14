import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
  sender: string; // Either the customer ID or staff ID
  senderType: "customer" | "staff"; // To differentiate sender type
  content: string;
  timestamp: Date;
  read: boolean;
}

interface IChat extends Document {
  customer: string; // Customer ID (only one per chat)
  messages: IMessage[]; // Message history
}

const MessageSchema: Schema = new Schema(
  {
    sender: { type: String, required: true }, // Can be customer ID or staff ID
    senderType: { type: String, enum: ["customer", "staff"], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
  },
  { _id: false }
);

const ChatSchema: Schema = new Schema(
  {
    customer: { type: String, required: true, unique: true }, // One chat per customer
    messages: [MessageSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", ChatSchema);
