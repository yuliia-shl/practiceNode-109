import {
  addProductController,
  getAllProductsControler,
  getProductByIdController,
  updateProductController,
} from '../controllers/products.js';

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/products', ctrlWrapper(getAllProductsControler));
router.get('/products/:productId', ctrlWrapper(getProductByIdController));
router.post('/products', ctrlWrapper(addProductController));
router.patch('/products/:productId', ctrlWrapper(updateProductController));
export default router;
