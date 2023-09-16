import { HttpException, HttpStatus } from '@nestjs/common';

import { USER_NOT_FOUND } from '@app/shared/errors/auth';
import { WRONG_DATA } from '@app/shared/errors/common';

export const handleError = (e: string) => {
  switch (e) {
    case 'NotFound':
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: USER_NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );

    case 'BadData':
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: WRONG_DATA,
        },
        HttpStatus.BAD_REQUEST,
      );
  }
};
