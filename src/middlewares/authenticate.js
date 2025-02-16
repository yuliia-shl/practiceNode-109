import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide authorization header'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(
      createHttpError(401, 'Authorization header should be of type bearer'),
    );
  }

  const session = await SessionCollection.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'Session not found'));
  }

  req.user = user;

  next();
};
