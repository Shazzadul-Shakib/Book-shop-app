import { Book } from '../../product/product.model';
import { TOrder } from '../order.interface';
import { Order } from '../order.model';

export const createOrderService = async (orderInfo: TOrder) => {
  const { product, quantity: orderedQuantity } = orderInfo;

  try {
    // ----- Find the desired product ----- //
    const desiredProduct = await Book.findById(product);

    if (!desiredProduct) {
      return { success: false, message: 'Product not found.' };
    }

    if (orderedQuantity > desiredProduct.quantity) {
      return { success: false, message: 'Not enough quantity in stock.' };
    }

    // ----- Update product quantity atomically ----- //
    const updatedProduct = await Book.findByIdAndUpdate(
      product,
      { $inc: { quantity: -orderedQuantity } },
      { new: true },
    );

    if (updatedProduct && updatedProduct.quantity === 0) {
      // ----- Update inStock status if quantity is now zero ----- //
      await Book.findByIdAndUpdate(product, { inStock: false }, { new: true });
    }

    // ----- If everything is okay then Create the order ----- //
    const createdOrder = await Order.create(orderInfo);

    // ----- Return success with the created order ----- //
    return {
      success: true,
      message: 'Order created successfully.',
      data: createdOrder,
    };
  } catch (error) {
    console.log(error);
    // ----- Return failure response ----- //
    return {
      success: false,
      message: 'Error creating order.',
    };
  }
};
