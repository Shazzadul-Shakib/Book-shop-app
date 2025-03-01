/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errorHandlers/AppError';
import { createToken } from '../../utils/createToken';
import { IUpdatePassword, IUpdateUser, IUser, TLogin } from './auth.interface';
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
  if (
    !payload?.password ||
    !(await User.isPasswordMatched(payload.password, user?.password))
  ) {
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

const updateUserProfileService = async (
  userId: string,
  payload: IUpdateUser,
) => {
  const result = await User.findByIdAndUpdate(userId, payload, { new: true });

  // ----- checking if user exist ----- //
  const user = await User.isUserExistsById(userId);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  if (!result) {
    throw new AppError(404, 'Failed to update user profile');
  }

  // ----- create access token ----- //
  const jwtPayload = {
    _id: result._id,
    name: result.name,
    email: result.email,
    image: result.image,
    role: result.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_expire_in as string,
  );

  return { accessToken };
};

// ----- update password service ----- //
const updatePasswordService = async (
  userId: string,
  payload: IUpdatePassword,
) => {
  // ----- checking if user exist ----- //
  const user = await User.isUserExistsById(userId);
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // ----- checking if password is matched ----- //
  if (
    !payload?.currentPassword ||
    !(await User.isPasswordMatched(payload.currentPassword, user?.password))
  ) {
    throw new AppError(400, 'Current password is incorrect');
  }

  // ----- updating password manually to trigger hashing ----- //
  user.password = payload.newPassword;
  await user.save();

  return {};
};

// ----- get all users service ----- //
const getAllUsersService = async () => {
  const users = await User.find().select('-password');
  return users;
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
  if (!user?.email || !user?.role) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid user data');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
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
  updatePasswordService,
  getAllUsersService,
  refreshToken,
};
