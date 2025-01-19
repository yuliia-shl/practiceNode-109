import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import { getAllProducts, getProductById } from './services/products.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/products', async (req, res) => {
    const response = await getAllProducts();
    res.json({
      status: 200,
      message: 'Successfully found products!',
      data: response,
    });
  });
  app.get('/products/:productId', async (req, res, next) => {
    const {productId} = req.params;
    const response = await getProductById (productId)
    if (!response) {
      res.status(404).json ({
        status: 404,
        message: "Product not found"
      });
      return
    };
    res.status(200).json({
      status:200,
      message: 'Successfully found products!',
      data: response,
    });
});


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
