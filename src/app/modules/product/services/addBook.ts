import { TBook } from '../product.interface';
import { Book } from '../product.model';

export const addBookService = async (book: TBook) => {
  const result = await Book.create(book);
  return result;
};
