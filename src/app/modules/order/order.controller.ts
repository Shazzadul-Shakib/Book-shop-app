import { Request, Response } from 'express';
import { orderServices } from './services';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo = req.body;
    const result = await orderServices.createOrderService(orderInfo);

    // ----- Send Response ----- //
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const orderController = {
  createOrder,
};
