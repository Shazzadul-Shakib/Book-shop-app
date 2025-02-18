import { Order } from '../order.model';

export const deleteSingleOrderService = async (orderId: string) => {
  const order = await Order.findByIdAndDelete(orderId);

  return order;
};
