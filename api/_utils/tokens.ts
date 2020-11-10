import jwt from 'jsonwebtoken';

export const generateAccessToken = (_id: string) => {
  return jwt.sign({_id}, process.env.TOKEN_SECRET as jwt.Secret, { expiresIn: '24h' });
};

export const verifyAccessToken = (token: string): {_id: string}|false => {
  if (!token) return false;
  return jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret) as {_id: string};
};
