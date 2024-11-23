import { Request, Response } from 'express';
import { orderServices } from './services';

// ----- Create order ----- //
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo = req.body;
    const result = await orderServices.createOrderService(orderInfo);

    // ----- Send Response ----- //
    res.status(200).json({
      message: result.message,
      status: result.success,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// ----- Calculation of total revenue ----- //
const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getTotalRevenueService();

    // ----- Send Response ----- //
    res.status(200).json({
      message: result.message,
      status: result.success,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const orderController = {
  createOrder,
  getTotalRevenue,
};
