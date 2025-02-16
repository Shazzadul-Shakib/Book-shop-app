import { Order } from '../order.model';

export const getAllOrdersService = async () => {
  const orders = await Order.find()
    .populate({
      path: 'user',
      model: 'User',
      select: 'name',
    })
    .populate({
      path: 'products.productId',
      model: 'Book',
      select: 'title',
    });

  return orders;
};
