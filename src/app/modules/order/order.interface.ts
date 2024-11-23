import { Schema } from 'mongoose';

export type TOrder = {
  email: string;
  product: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
};
