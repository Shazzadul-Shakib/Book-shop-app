import express from 'express';
import cors from 'cors';
import { productRouter } from './app/modules/product/product.route';
import { orderRouter } from './app/modules/order/order.route';

export const app = express();

// ----- Parsers ------ //
app.use(express.json());
app.use(cors());

// ----- Routers ----- //
app.use('/api', productRouter);
app.use('/api', orderRouter);

app.get('/', (req, res) => {
  res.send('Book-shop app in running...');
});
