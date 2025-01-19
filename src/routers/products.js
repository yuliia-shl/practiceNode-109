import {
  addProductController,
  getAllProductsControler,
  getProductByIdController,
} from '../controllers/products.js';

import { Router } from 'express';

const router = Router();

router.get('/products', getAllProductsControler);
router.get('/products/:productId', getProductByIdController);
router.post('/products', addProductController);

export default router;
