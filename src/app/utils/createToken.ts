import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: jwt.Secret,
  expiresIn: string | number,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as jwt.SignOptions);
};
