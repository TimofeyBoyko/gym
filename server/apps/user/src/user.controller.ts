import { Controller, Get, Inject, BadRequestException } from '@nestjs/common';

import { UserAuthRepository, UserRepository } from '@app/shared/repositories';

import { UserService } from './user.service';
import { UserAuthEntity, UserEntity } from '@app/entities';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(UserRepository) private userRepository: UserRepository,
    @Inject(UserAuthRepository) private userAuthRepository: UserAuthRepository,
  ) {}

  @Get('@self')
  async getHello(): Promise<UserAuthEntity[]> {
    try {
      const users = await this.userAuthRepository.get(
        '5307ee44-75e6-4e4d-8416-278c41ffb57b',
      );

      return users;
    } catch (e) {
      console.log(e);
    }

    // throw new BadRequestException('Something bad happened', {
    //   cause: new Error(),
    //   description: 'Some error description',
    // });
  }
}
