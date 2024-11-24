import { TUpdateBookData } from '../product.interface';
import { Book } from '../product.model';

export const updateBookService = async (
  productId: string,
  updatedData: TUpdateBookData,
) => {
  const result = await Book.findByIdAndUpdate(
    productId,
    {
      ...updatedData,
    },
    {
      new: true,
    },
  );

  // ----- Return response if no books matched ----- //
  if (!result) {
    return {
      message: 'No book found with the specified ID',
      success: false,
      status: 404,
      data: [],
    };
  }

  // ----- Return response if books matched ----- //
  return {
    message: 'Book updated successfully',
    success: true,
    status: 200,
    data: result,
  };

};
