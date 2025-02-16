import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';

export const registerUser = async (body) => {
  console.log(body);

  const user = await User.findOne({ email: body.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  body.password = await bcrypt.hash(body.password, 10);

  return User.create(body);
};
