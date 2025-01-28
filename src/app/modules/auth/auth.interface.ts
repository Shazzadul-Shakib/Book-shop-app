import { Model, Types } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
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

export type TUserRole = keyof typeof USER_ROLE;