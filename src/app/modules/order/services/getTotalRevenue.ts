import { Order } from '../order.model';

export const getTotalRevenueService = async () => {
  // ----- Aggregation to calculate total revenue ----- //
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$totalPrice', '$quantity'],
          },
        },
      },
    },
  ]);

  // ----- Extract the revenue or default to 0 if no orders exist ----- //
  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

  return {
    success: true,
    message: 'Revenue calculated successfully',
    data: { totalRevenue },
  };
};
