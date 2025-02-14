import { Order } from '../order.model';

export const getSinglePersonsOrdersService = async (userId: string) => {
  const orders = await Order.find({ user: userId }).populate({
    path: 'products.productId',
    model: 'Book',
    select: 'title',
  });

  return orders;
};
