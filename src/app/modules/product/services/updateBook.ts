/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUpdateBookData } from '../product.interface';
import { Book } from '../product.model';

export const updateBookService = async (
  productId: string,
  updatedData: TUpdateBookData,
) => {
  // If the quantity is greater than 0, mark the book as in stock
  if (updatedData.quantity !== undefined && updatedData.quantity > 0) {
    updatedData.inStock = true;
  } else {
    updatedData.inStock = false; // Handle out-of-stock scenario if needed
  }

  // ----- Attempt to update the book ----- //
  try {
    const result = await Book.findByIdAndUpdate(
      productId,
      { ...updatedData },
      { new: true }, // `new: true` ensures that the updated document is returned
    );

    // If no book is found with the given productId
    if (!result) {
      return {
        message: 'No book found with the specified ID',
        success: false,
        status: 404,
        data: {},
      };
    }

    // Return success response if the book was updated
    return {
      message: 'Book updated successfully',
      success: true,
      status: 200,
      data: result,
    };
  } catch (error:any) {
    // Catch any errors during the update process
    return {
      message: 'Error updating the book',
      success: false,
      status: 500,
      data: {},
      error: error.message || 'An unexpected error occurred',
    };
  }
};
