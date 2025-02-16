import { ONE_DAY } from '../constants/index.js';
import { loginUser, registerUser } from '../services/user.js';

export const registerController = async (req, res) => {
  const userRegister = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a use!',
    data: userRegister,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  res.cookie('refreshToken', session.refreshToken, {
   expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    expires: new Date(Date.now() + ONE_DAY),
  });




  res.json({
  status: 200,
  message: "Successfully logged in an user!",
    data:{ accessToken: session.accessToken,},
  });
};
