import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/session.js';
import{randomBytes} from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const registerUser = async (body) => {
  console.log(body);

  const user = await User.findOne({ email: body.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  body.password = await bcrypt.hash(body.password, 10);

  return User.create(body);
};


export const loginUser = async (payload) => {
  const user = await User.findOne({email: payload.email});
  if(!user){
    throw createHttpError(404, 'User not founder');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError (401, 'Unauthorized');
  }

  await SessionCollection.deleteOne({userId: user._id});

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
