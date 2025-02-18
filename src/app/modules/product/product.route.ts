import express from 'express';
import { productController } from './product.controller';

export const productRouter = express.Router();

productRouter.post('/products', productController.addBook);
productRouter.get('/products', productController.getAllBooks);
productRouter.get('/products/:productId', productController.getBook);
productRouter.patch('/products/:productId', productController.updateBook);
productRouter.delete('/products/:productId', productController.deleteeBook);
