import { createOrderService } from './createOrder';
import { deleteSingleOrderService } from './deleteSingleOrder';
import { getAllOrdersService } from './getAllOrders';
import { getSinglePersonsOrdersService } from './getSinglePersonsOrder';
import { getTotalRevenueService } from './getTotalRevenue';
import { successPayment } from './successPayment';

export const orderServices = {
  createOrderService,
  getTotalRevenueService,
  successPayment,
  getSinglePersonsOrdersService,
  getAllOrdersService,
  deleteSingleOrderService,
};
