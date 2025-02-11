import axios from 'axios';
import { ISSLCommerzTransaction } from '../order.interface';
import { Order } from '../order.model';
import config from '../../../config';

export const successPayment = async (orderInfo: ISSLCommerzTransaction) => {
  try {
    if (!config.storeId || !config.storePassword) {
      throw new Error('SSLCommerz credentials are missing!');
    }

    // Ensure orderInfo contains val_id
    if (!orderInfo.val_id) {
      return { message: 'Invalid payment data: val_id is missing.' };
    }

    // Validate payment with SSLCommerz API
    const { data } = await axios.get(
      `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php`,
      {
        params: {
          val_id: orderInfo.val_id,
          store_id: config.storeId,
          store_passwd: config.storePassword,
          format: 'json',
        },
      },
    );

    console.log('Payment Validation Response:', data);

    // Check if payment was successful
    if (data.status !== 'VALID') {
      return { message: 'Payment Unsuccessful' };
    }

    // Ensure `tran_id` exists before updating order
    if (!data.tran_id) {
      return {
        message: 'Transaction ID is missing in payment validation data.',
      };
    }

    // Update the order status in the database
    const updatedOrder = await Order.findOneAndUpdate(
      { transactionId: data.tran_id },
      { $set: { status: 'success' } },
      { new: true }, // ✅ Returns the updated document
    );

    if (!updatedOrder) {
      return {
        message: `Order with transaction ID ${data.tran_id} not found!`,
      };
    }

    console.log('Order updated successfully:', updatedOrder);

    return { redirectUrl: `${config.clientUrl}/checkout?success=true` }; // ✅ Use dynamic URL
  } catch (error) {
    console.error('Error processing payment:', error);
    return { message: 'An error occurred while processing the payment.' };
  }
};
