import { CatchAsync } from '../../utils/catchAsync';
import { authServices } from './auth.service';
import { SendResponse } from '../../utils/sendResponse';
import config from '../../config';

// ----- register user ----- //
const registerUser = CatchAsync(async (req, res) => {
  const result = await authServices.registerUserService(req.body);

  SendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User created successfully!',
    data: result,
  });
});

// ----- login user ----- //
const loginUser = CatchAsync(async (req, res) => {
  const result = await authServices.loginUserService(req.body);

  const { accessToken, refreshToken } = result;

  // ----- set refresh token to cookies ----- //
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  SendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: { token: accessToken },
  });
});

export const authController = { registerUser, loginUser };
