import express from 'express';
import cors from 'cors';
import { productRouter } from './app/modules/product/product.route';
export const app = express();

// ----- Parsers ------ //
app.use(express.json());
app.use(cors());

// ----- Routers ----- //
app.use('/api', productRouter);

app.get('/', (req, res) => {
  res.send('Book-shop app in running...');
});
