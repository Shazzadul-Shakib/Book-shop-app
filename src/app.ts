import express from 'express';
import cors from 'cors';
import { productRouter } from './app/modules/product/product.route';
import { orderRouter } from './app/modules/order/order.route';
import { authRouter } from './app/modules/auth/auth.route';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';

export const app = express();

// ----- Parsers ------ //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://my-bookstore-shazzadul-shakib.vercel.app',
    ],
    credentials: true,
  }),
);
// Handle preflight requests
app.options(
  '*',
  cors({
    origin: [
      'http://localhost:5173',
      'https://my-bookstore-shazzadul-shakib.vercel.app',
    ],
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send('Book-shop app in running...');
});

// ----- Routers ----- //
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', authRouter);

// ----- global error handler ----- //
app.use(globalErrorHandler);

// ----- API not found handler ----- //
app.use(notFound);
