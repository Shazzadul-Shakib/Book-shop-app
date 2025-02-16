import { Request, Response } from 'express';
import { orderServices } from './services';
import { CatchAsync } from '../../utils/catchAsync';
import { SendResponse } from '../../utils/sendResponse';

// ----- Create order ----- //
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo = req.body;
    const result = await orderServices.createOrderService(orderInfo);

    // ----- Send Response ----- //
    res.status(result.status).json({
      message: result.message,
      success: result.success,
      data: result.data,
      error: result.error || null,
    });
  } catch (error) {
    console.log(error);
  }
};

// ----- success payment controller ----- //
export const successPayment = CatchAsync(
  async (req: Request, res: Response) => {
    const result = await orderServices.successPayment(req.body);

    if (result?.redirectUrl) {
      return res.redirect(result.redirectUrl);
    }

    SendResponse(res, {
      success: true,
      message: result.message || 'Payment successful',
      statusCode: 200,
      data: result,
    });
  },
);

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

// ---- get single persons order  ---- //
const getSinglePersonsOrders = CatchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await orderServices.getSinglePersonsOrdersService(userId);

  SendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Orders retrived successfully',
    data: result,
  });
});

// ---- get all orders  ---- //
const getAllOrders = CatchAsync(async (req, res) => {
  const result = await orderServices.getAllOrdersService();

  SendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Orders retrived successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
  getTotalRevenue,
  successPayment,
  getSinglePersonsOrders,
  getAllOrders,
};
