import mongoose, { Schema, Document, Types } from 'mongoose';

interface IMessage {
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface IChat extends Document {
  customer: string;
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema(
  {
    sender: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
  },
  { _id: false }
);

const ChatSchema: Schema = new Schema(
  {
    customer: { type: String, required: true },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IChat>('Chat', ChatSchema);
