import {
  addProductController,
  deleteProductController,
  getAllProductsControler,
  getProductByIdController,
  updateProductController,
} from '../controllers/products.js';

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductSchema,
  patchProductSchema,
} from '../validation/product.js';
import { isValidId } from '../middlewares/isValidid.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/products', ctrlWrapper(getAllProductsControler));
router.get(
  '/products/:productId',
  isValidId,
  ctrlWrapper(getProductByIdController),
);
router.post(
  '/products',
  validateBody(createProductSchema),
  ctrlWrapper(addProductController),
);
router.patch(
  '/products/:productId',
  isValidId,
  validateBody(patchProductSchema),
  ctrlWrapper(updateProductController),
);
router.delete(
  '/products/:productId',
  isValidId,
  ctrlWrapper(deleteProductController),
);
export default router;
