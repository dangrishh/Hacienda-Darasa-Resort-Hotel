import mongoose, { Schema, Document } from "mongoose";

interface IRoom {
  name: string;
  details: mongoose.Types.ObjectId;
  booked: boolean;
  bookedBy?: mongoose.Types.ObjectId | null;
  bookingStartTime?: Date | null;
  bookingEndTime?: Date | null;
  pictures?: mongoose.Types.ObjectId[] | null;
}

interface IRoomDocument extends IRoom, Document {}

const RoomSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    details: { type: Schema.Types.ObjectId, ref: "RoomDetails", required: true },
    booked: { type: Boolean, default: false },
    bookedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    bookingStartTime: { type: Date, default: null },
    bookingEndTime: { type: Date, default: null },
    pictures: [{ type: Schema.Types.ObjectId, ref: "Picture", default: null }],
  },
  { timestamps: true }
);

export default mongoose.model<IRoomDocument>("Room", RoomSchema);
