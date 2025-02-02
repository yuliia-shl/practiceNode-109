import {
  addProductController,
  getAllProductsControler,
  getProductByIdController,
  updateProductController,
} from '../controllers/products.js';

import { Router } from 'express';

const router = Router();

router.get('/products', getAllProductsControler);
router.get('/products/:productId', getProductByIdController);
router.post('/products', addProductController);
router.patch('/products/:productId', updateProductController);
export default router;
