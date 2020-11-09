import jwt from 'jsonwebtoken';

export const generateAccessToken = (_id: string) => {
  return jwt.sign({_id}, process.env.TOKEN_SECRET as jwt.Secret, { expiresIn: '1h' });
};
