import {
  Controller,
  Get,
  HttpStatus,
  Put,
  Req,
  Body,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserEntity } from '@app/entities';
import { getUserId } from '@app/shared/utils';
import { UserType } from '@app/shared/enums';

import { UserService } from './user.service';

import { handleError } from './utils';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('@self')
  async getSelf(@Req() req: Request): Promise<UserEntity> {
    const userId = getUserId(req);

    try {
      return this.userService.getSelf(userId);
    } catch (e) {
      handleError(e);
    }
  }

  @Put('/change/type')
  async changeType(
    @Req() req: Request,
    @Res() res: Response,
    @Body() newType: UserType,
  ) {
    const userId = getUserId(req);

    try {
      await this.userService.changeType(userId, newType);

      res.status(HttpStatus.OK).send();
    } catch (e) {
      handleError(e);
    }
  }

  @Put('/change/status')
  async changeStatus(
    @Req() req: Request,
    @Res() res: Response,
    @Body() newType: UserType,
  ) {
    const userId = getUserId(req);

    try {
      await this.userService.changeType(userId, newType);

      res.status(HttpStatus.OK).send();
    } catch (e) {
      handleError(e);
    }
  }
}
