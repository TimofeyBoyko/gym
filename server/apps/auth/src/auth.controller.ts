import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UserAuthRepository, UserRepository } from '@app/shared/repositories';
import {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from '@app/shared/errors/auth';

import { CheckEmailDto, LoginDto, RegistrationDto } from './dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(UserRepository) private userRepository: UserRepository,
    @Inject(UserAuthRepository) private userAuthRepository: UserAuthRepository,
  ) {}

  //TODO: return token and reserve email for time
  @Post('checkemail')
  async checkEmail(@Res() res: Response, @Body() checkEmailDto: CheckEmailDto) {
    const { email } = checkEmailDto;

    try {
      await this.authService.checkEmail(email);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: USER_ALREADY_EXISTS,
        },
        HttpStatus.CONFLICT,
      );
    }

    res.status(HttpStatus.OK).send();
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    try {
      const user = await this.authService.validateUser(email, password);

      return this.authService.login(user.id);
    } catch (e) {
      switch (e.message) {
        case 'NotFound':
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: USER_NOT_FOUND,
            },
            HttpStatus.NOT_FOUND,
          );

        case 'WrongPassword':
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              error: WRONG_PASSWORD,
            },
            HttpStatus.CONFLICT,
          );
      }
    }
  }

  @Post('registration')
  async registration(
    @Res() res: Response,
    @Body() registrationDto: RegistrationDto,
  ): Promise<void> {
    const { email, password } = registrationDto;

    try {
      await this.authService.checkEmail(email);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: USER_ALREADY_EXISTS,
        },
        HttpStatus.CONFLICT,
      );
    }

    const userInfo = await this.authService.createUser(registrationDto);

    const { id } = await this.userRepository.save(userInfo);

    const hashPassword = await this.authService.generateHashPassword(password);

    const auth = this.userAuthRepository.create();

    auth.userId = id;
    auth.passwordHash = hashPassword;

    await this.userAuthRepository.save(auth);

    res.status(HttpStatus.CREATED).send();
  }
}
