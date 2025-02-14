import express from 'express';
import { orderController } from './order.controller';
import { authGuard } from '../../middleware/authGuard';

export const orderRouter = express.Router();

orderRouter.post('/orders', authGuard('user'), orderController.createOrder);
orderRouter.post('/orders/success-payment', orderController.successPayment);
orderRouter.get('/orders/revenue', orderController.getTotalRevenue);
orderRouter.get('/orders/:userId', orderController.getSinglePersonsOrders);
