import { Book } from "../product.model"

export const getAllBooksService=async()=>{
    const result = await Book.find();
    return result;
}