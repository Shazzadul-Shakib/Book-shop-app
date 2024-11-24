import { Book } from '../product.model';

export const getBookService = async (productId: string) => {
  const result = await Book.findOne({ _id: productId });

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
    message: 'Book retrived successfully',
    success: true,
    status: 200,
    data: result,
  };
};
