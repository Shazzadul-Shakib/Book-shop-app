// Define the BookCategory type
type BookCategory =
  | 'Fiction'
  | 'Science'
  | 'SelfDevelopment'
  | 'Poetry'
  | 'Religious';

export type TBook = {
  title: string;
  author: string;
  price: number;
  category: BookCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateBookData ={
  name?: string;
  author?: string;
  price?: number;
  category?: string;
  description?: string;
  quantity?: number;
  inStock?: boolean;
}