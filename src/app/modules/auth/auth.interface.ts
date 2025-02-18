import { Document, Model, Types } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  image: string;
  password: string;
  isBlocked: boolean;
  role: 'admin' | 'user';
  phone?: string;
  city?: string;
  address?: string;
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByEmail(email: string): Promise<IUser>;
  isUserExistsById(id: string): Promise<IUser>;
}

export type TLogin = {
  email: string;
  password: string;
};

export interface IUpdateUser {
  _id?: Types.ObjectId;
  name?: string;
  email?: string;
  image?: string;
  isBlocked?: boolean;
}
export interface IUpdatePassword {
  currentPassword: string;
  newPassword: string;
}

export type TUserRole = keyof typeof USER_ROLE;
