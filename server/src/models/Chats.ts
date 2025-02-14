import mongoose, { Schema, Document, Types } from 'mongoose';

interface IMessage {
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface IChat extends Document {
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema(
  {
    sender: { type: String, required: true },
    recipient: {type: String, required: true},
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
  },
  { _id: false }
);

const ChatSchema: Schema = new Schema(
  {
    messages: [MessageSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IChat>('Chat', ChatSchema);
