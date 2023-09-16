import { Injectable, Inject } from '@nestjs/common';

import { UserRepository } from '@app/shared/repositories';
import { UserEntity } from '@app/entities';
import { UserStatus, UserType } from '@app/shared/enums';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async getSelf(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.get(userId);

    if (!user) {
      throw new Error('NotFound');
    }

    return user;
  }

  async changeType(userId: string, newType: UserType) {
    if (!Object.values(UserType).includes(newType)) {
      throw new Error('BadData');
    }

    const user = await this.userRepository.get(userId);

    if (!user) {
      throw new Error('NotFound');
    }

    if (user.type === newType) return;

    user.type = newType;

    await this.userRepository.update(user);
  }

  async changeStatus(userId: string, newStatus: UserStatus) {
    if (!Object.values(UserStatus).includes(newStatus)) {
      throw new Error('BadData');
    }

    const user = await this.userRepository.get(userId);

    if (!user) {
      throw new Error('NotFound');
    }

    if (user.status === newStatus) return;

    user.status = newStatus;

    await this.userRepository.update(user);
  }
}
