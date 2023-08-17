import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards';

export const AuthProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
