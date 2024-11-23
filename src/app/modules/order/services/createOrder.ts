import { TOrder } from '../order.interface';
import { Order } from '../order.model';

export const createOrderService = async (orderInfo: TOrder) => {
  const result = await Order.create(orderInfo);
  return result;
};
