import config from '../../config';
import AppError from '../../errorHandlers/AppError';
import { createToken } from '../../utils/createToken';
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

  // ----- checking if password is matched ----- //
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(400, 'Invalid credentials');
  }

  // ----- create access token ----- //
  const jwtPayload = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_expire_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    config.refresh_expire_in as string,
  );

  return { accessToken, refreshToken };
};

export const authServices = { registerUserService, loginUserService };
