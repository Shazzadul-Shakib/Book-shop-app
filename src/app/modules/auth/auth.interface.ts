import { Model, Types } from 'mongoose';

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