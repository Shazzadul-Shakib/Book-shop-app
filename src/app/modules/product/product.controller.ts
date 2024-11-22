import { Request, Response } from 'express';
import { productServices } from './services';

const addBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const result = await productServices.addBookService(book);

    // ----- Send Response ----- //
    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productController = {
  addBook,
};
