import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';

import productsRouter from './routers/products.js';
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(productsRouter);

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });
  app.use((err, req, res, _next) => {
    res.status(500).json({
      message: 'Something went wrong',
      data: err.message,
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
