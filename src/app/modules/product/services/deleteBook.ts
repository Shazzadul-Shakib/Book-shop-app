import { Book } from '../product.model';

export const deleteBookService = async (productId: string) => {
  const result = await Book.findByIdAndDelete(productId);
  return result;
};
