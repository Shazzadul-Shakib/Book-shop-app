import QueryBuilder from '../../../../builder/queryBuilder';
import { Book } from '../product.model';

export const getAllBooksService = async (
  searchQuery: Record<string, unknown>,
) => {
  // // ----- Case-insensitive search, sort & filter options ----- //

  const bookSearchableFields = ['title', 'author', 'category'];
  const bookQuery = new QueryBuilder(Book.find(), searchQuery)
    .search(bookSearchableFields)
    .filter()
    .sort()
    .populate();
  const result = await bookQuery.queryModel;

  // ----- Return response if no books matched ----- //
  if (result.length === 0) {
    return {
      message: 'No Book Found',
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
