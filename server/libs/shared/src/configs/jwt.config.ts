import { JWT_SECRET } from '../constants';

export const jwtOptions = {
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: '24h' },
};
