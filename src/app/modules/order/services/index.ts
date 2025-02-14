import { createOrderService } from './createOrder';
import { getSinglePersonsOrdersService } from './getSinglePersonsOrder';
import { getTotalRevenueService } from './getTotalRevenue';
import { successPayment } from './successPayment';

export const orderServices = {
  createOrderService,
  getTotalRevenueService,
  successPayment,
  getSinglePersonsOrdersService,
};
