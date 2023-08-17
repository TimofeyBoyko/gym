import { Injectable, Inject } from '@nestjs/common';

import { UserRepository } from '@app/shared/repositories';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  checkEmail = async (email: string) => {
    const user = await this.userRepository.getByEmail(email);

    return user;
  };

  createUser = async () => {
    const users = await this.userRepository.getAll();

    console.log(users);

    return;
  };
}
