import { IUser } from './auth.interface';
import { User } from './auth.model';

// ----- register user service ----- //
const registerUserService = async (payload: Partial<IUser>) => {
  const result = await User.create(payload);
  return result;
};

export const authServices = { registerUserService };
