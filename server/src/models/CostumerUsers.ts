import mongoose, { Schema, Document, Types } from 'mongoose';

interface ICostumerUsers extends Document {
  fullname: string;
  email: string;
  password: string;
  selectedCategory?: Types.ObjectId; // ✅ Ensure it’s an ObjectId
}

const CostumerUserSchema: Schema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  selectedCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // ✅ Add ref to Category
});

export default mongoose.model<ICostumerUsers>('ClientUsers', CostumerUserSchema);
