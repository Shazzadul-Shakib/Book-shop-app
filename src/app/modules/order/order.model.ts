import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true,
        },
        quantity: {
          type: Number,
          required: [true, 'Quantity is required.'],
          min: [1, 'Quantity must be at least 1.'],
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: [true, 'Total price is required.'],
      min: [0, 'Total price must be a positive number.'],
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model<TOrder>('Order', orderSchema);
