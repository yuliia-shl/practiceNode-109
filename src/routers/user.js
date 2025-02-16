import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerController } from '../controllers/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema } from '../validation/user.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

export default router;
