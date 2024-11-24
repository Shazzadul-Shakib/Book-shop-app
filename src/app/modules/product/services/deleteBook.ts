import { Book } from '../product.model';

export const deleteBookService = async (productId: string) => {
  const result = await Book.findByIdAndDelete(productId);

  // ----- Return response if no books matched ----- //
  if (!result) {
    return {
      message: 'No book found with the specified ID',
      success: false,
      status: 404,
      data: {},
    };
  }

  // ----- Return response if books matched ----- //
  return {
    message: 'Book deleted successfully',
    success: true,
    status: 200,
    data: {},
  };
};
