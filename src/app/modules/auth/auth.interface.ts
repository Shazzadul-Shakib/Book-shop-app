import { Model, Types } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  image: string;
  password: string;
  role: 'admin' | 'user';
  phone?:string,
  city?:string,
  address?:string,
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

}

export type TUserRole = keyof typeof USER_ROLE;