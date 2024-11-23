import { Book } from '../product.model';

export const getBookService = async (productId: string) => {
  const result = await Book.findOne({ _id: productId });
  return result;
};
