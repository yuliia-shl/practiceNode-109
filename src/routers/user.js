import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserController, registerController } from '../controllers/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerSchema } from '../validation/user.js';

const router = express.Router();

router.post(
  '/users/register',
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);
router.post('/users/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

export default router;
