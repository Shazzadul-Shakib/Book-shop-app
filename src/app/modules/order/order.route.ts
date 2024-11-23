import express from 'express';
import { orderController } from './order.controller';

export const orderRouter = express.Router();

orderRouter.post('/orders', orderController.createOrder);
