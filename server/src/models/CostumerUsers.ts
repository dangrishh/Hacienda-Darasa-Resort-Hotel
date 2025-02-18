import mongoose, { Schema, Document, Types } from 'mongoose';

interface ICostumerUsers extends Document {
  fullname: string;
  email: string;
  contactNumber: string;
  password: string;
  selectedCategory?: Types.ObjectId; 
}

const CostumerUserSchema: Schema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  selectedCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
},
{ timestamps: true }
);

export default mongoose.model<ICostumerUsers>('CustomerUser', CostumerUserSchema);
