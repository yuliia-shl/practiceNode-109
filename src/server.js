import express from 'express';
import cors from 'cors';

import userRouter from './routers/user.js';

import { env } from './utils/env.js';

import productsRouter from './routers/products.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(cookieParser());
  app.use(userRouter);
  app.use(productsRouter);
  

  app.use('*', notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
