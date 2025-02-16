import { registerUser } from '../services/user.js';

export const registerController = async (req, res) => {
  const userRegister = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a use!',
    data: userRegister,
  });
};
