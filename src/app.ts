import express from 'express';
import cors from 'cors';
import { productRouter } from './app/modules/product/product.route';
import { orderRouter } from './app/modules/order/order.route';
import { authRouter } from './app/modules/auth/auth.route';

export const app = express();

// ----- Parsers ------ //
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// ----- Routers ----- //
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', authRouter);

app.get('/', (req, res) => {
  res.send('Book-shop app in running...');
});
