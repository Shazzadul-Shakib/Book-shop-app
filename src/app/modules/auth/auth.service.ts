import AppError from '../../errorHandlers/AppError';
import { IUser, TLogin } from './auth.interface';
import { User } from './auth.model';

// ----- register user service ----- //
const registerUserService = async (payload: Partial<IUser>) => {
  const result = await User.create(payload);
  return {
    _id: result._id,
    name: result.name,
    email: result.email,
    role: result.role,
  };
};

// ----- login user service ----- //
const loginUserService = async (payload: TLogin) => {
  // ----- checking if user exist ----- //
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(400, 'Invalid credentials');
  }
};

export const authServices = { registerUserService, loginUserService };
