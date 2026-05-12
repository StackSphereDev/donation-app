import mongoose, { Document, Schema } from 'mongoose';

export interface IDonation extends Document {
  fullName: string;
  email: string;
  phone: string;
  amount: number;
  message?: string;
  transactionId: string;
  paymentStatus: 'pending' | 'success' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new Schema<IDonation>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit Indian phone number']
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [100, 'Minimum donation amount is ₹100']
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters']
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

donationSchema.index({ email: 1 });
donationSchema.index({ createdAt: -1 });

export const Donation = mongoose.model<IDonation>('Donation', donationSchema);
