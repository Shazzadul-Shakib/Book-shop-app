import express from 'express';
import { productController } from './product.controller';

export const productRouter = express.Router();

productRouter.post('/products', productController.addBook);
