/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errorHandlers/AppError';
import { createToken } from '../../utils/createToken';
import { IUpdateUser, IUser, TLogin } from './auth.interface';
import { User } from './auth.model';
import httpStatus from 'http-status-codes';

// ----- register user service ----- //
const registerUserService = async (payload: Partial<IUser>) => {
  const result = await User.create(payload);
  return {
    _id: result._id,
    name: result.name,
    email: result.email,
    image: result.image,
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
    image: user?.image,
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

const updateUserProfileService = async (userId: string, payload: IUpdateUser) => {
  const result = await User.findByIdAndUpdate(userId, payload, { new: true });
  return result;
};

// ----- refresh token service ----- //
const refreshToken = async (token: string) => {
  // ----- Verify the JWT token ----- //
  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(
      token,
      config.refresh_token_secret as string,
    ) as JwtPayload;
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!');
  }

  const { email } = decoded;

  // ----- check existance of user ----- //
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // ----- create access token ----- //
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_expire_in as string,
  );

  return {
    accessToken,
  };
};

export const authServices = {
  registerUserService,
  loginUserService,
  updateUserProfileService,
  refreshToken,
};
