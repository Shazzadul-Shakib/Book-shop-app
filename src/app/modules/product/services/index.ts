import { addBookService } from './addBook';
import { deleteBookService } from './deleteBook';
import { getAllBooksService } from './getAllBooks';
import { getBookService } from './getBook';
import { updateBookService } from './updateBook';

export const productServices = {
  addBookService,
  getAllBooksService,
  getBookService,
  updateBookService,
  deleteBookService
};
