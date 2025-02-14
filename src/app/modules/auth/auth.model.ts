import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

// ----- hash pasword ----- //
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_round));
  next();
});

// ----- compare password ----- //
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// ----- checking if user exists by email----- //
UserSchema.statics.isUserExistsByEmail = async function (email) {
  return await User.findOne({ email });
};

// ----- checking if user exists by Id ----- //
UserSchema.statics.isUserExistsById = async function (id) {
  return await User.findById(id);
};

export const User = model<IUser, UserModel>('User', UserSchema);
