import { CatchAsync } from '../../utils/catchAsync';
import { authServices } from './auth.service';
import { SendResponse } from '../../utils/sendResponse';

const registerUser = CatchAsync(async (req, res) => {
  const result = await authServices.registerUserService(req.body);

  SendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User created successfully!',
    data: result,
  });
});

export const authController = { registerUser };
