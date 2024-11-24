import { Book } from '../product.model';

export const getAllBooksService = async (searchTerm?: string) => {
  // ----- Case-insensitive search in filter options ----- //
  const filter = searchTerm
    ? {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { author: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};
  const result = await Book.find(filter);

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
