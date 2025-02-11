import axios from 'axios';
import { ISSLCommerzTransaction } from '../order.interface';
import { Order } from '../order.model';

export const successPayment = async (orderInfo: ISSLCommerzTransaction) => {
  //   console.log('successpaymentInfo', orderInfo);

  const { data } = await axios.get(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${orderInfo.val_id}&store_id=books67aa0672d2300&store_passwd=books67aa0672d2300@ssl&format=json`,
  );

  console.log('getData', data.status !== 'VALIDATED');

  if (data.status === 'VALIDATED') {
    const updatedOrder = await Order.findOneAndUpdate(
      { transactionId: data.tran_id },
      {
        $set: { status: 'success' },
      },
      { new: true }, // ✅ Returns the updated document
    );

    if (!updatedOrder) {
      console.error(`Order with transaction ID ${data.tran_id} not found!`);
    } else {
      console.log('Order updated successfully:', updatedOrder);
      return { redirectUrl: 'http://localhost:5173/success' };
    }
  }

  
};
