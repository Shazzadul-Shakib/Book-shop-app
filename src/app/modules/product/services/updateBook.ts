import { UpdateBookData } from '../product.interface';
import { Book } from '../product.model';

export const updateBookService = async (
  productId: string,
  updatedData: UpdateBookData,
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

  return result;
};
