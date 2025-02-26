/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { TOrder } from '../order.interface'; // Assuming TOrder interface exists
import { Order } from '../order.model'; // Assuming Order model exists
import { Book } from '../../product/product.model'; // Assuming Book model exists
import { ObjectId } from 'mongodb';
import config from '../../../config';

export const createOrderService = async (orderInfo: TOrder) => {
  const { products } = orderInfo;

  try {
    // ----- Loop through the products to check each one ----- //
    for (const product of products) {
      const desiredProduct = await Book.findById(product.productId);

      if (!desiredProduct) {
        return { success: false, status: 404, message: 'Product not found.' };
      }

      // ----- Check if stock is sufficient ----- //
      if (product.quantity > desiredProduct.quantity) {
        return {
          success: false,
          status: 400,
          message: 'Not enough quantity in stock.',
        };
      }

      // ----- Update product quantity atomically ----- //
      await Book.findByIdAndUpdate(
        product.productId,
        { $inc: { quantity: -product.quantity } }, // Decrease stock by the quantity ordered
        { new: true },
      );

      if (desiredProduct.quantity - product.quantity === 0) {
        // ----- Update inStock status if quantity is now zero ----- //
        await Book.findByIdAndUpdate(
          product.productId,
          { inStock: false },
          { new: true },
        );
      }
    }

    // ----- Generate transaction ID for payment ----- //
    const transactionId = new ObjectId().toString();

    // ----- Initiate payment ----- //
    const initiatePayment = {
      store_id: config.storeId,
      store_passwd: config.storePassword,
      total_amount: orderInfo.totalPrice,
      currency: 'BDT',
      tran_id: transactionId, // unique transaction ID
      success_url:
        'https://book-shop-app-shazzadul-shakib.vercel.app/api/orders/success-payment',
      fail_url:
        'https://book-shop-app-shazzadul-shakib.vercel.app/api/orders/failed-payment',
      cancel_url:
        'https://book-shop-app-shazzadul-shakib.vercel.app/api/orders/failed-payment',
      ipn_url:
        'https://book-shop-app-shazzadul-shakib.vercel.app/ipn-success-payment',
      shipping_method: 'Courier',
      product_name: 'Book Order',
      product_category: 'Books',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };

    const sslczRes = await axios({
      url: 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
      method: 'POST',
      data: initiatePayment,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Attach the transaction ID to the order
    orderInfo.transactionId = transactionId;

    // Retrieve the gateway page URL
    const SSLgatewayPageUrl = sslczRes?.data?.GatewayPageURL;

    // ----- Create the order in the database ----- //
    await Order.create(orderInfo);

    // ----- Return success with the payment gateway URL ----- //
    return {
      success: true,
      status: 200,
      message: 'Order created successfully.',
      data: SSLgatewayPageUrl,
    };
  } catch (error: any) {
    // ----- Handle Mongoose validation errors ----- //
    if (error.name === 'ValidationError') {
      return {
        success: false,
        status: error.status || 400,
        message: error.message,
        error: error,
      };
    }

    // ----- Handle unexpected errors ----- //
    return {
      success: false,
      status: 500,
      message: 'An unexpected error occurred.',
      error: {
        name: error.name,
        message: error.message,
      },
    };
  }
};
