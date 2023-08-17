import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../filters';

export const AllExceptionsFilterProvider = {
  provide: APP_FILTER,
  useClass: AllExceptionsFilter,
};
