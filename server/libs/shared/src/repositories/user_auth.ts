import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserAuthEntity } from '@app/entities';

@Injectable()
export class UserAuthRepository {
  constructor(
    @InjectRepository(UserAuthEntity)
    private userAuthRepository: Repository<UserAuthEntity>,
  ) {}

  async get(userId: string): Promise<UserAuthEntity> {
    try {
      const userAuth: UserAuthEntity = await this.userAuthRepository
        .createQueryBuilder('auth')
        .where('auth.userId = :userId', { userId })
        .getOne();

      return userAuth;
    } catch (e) {
      console.log(e);
    }
  }

  create(): UserAuthEntity {
    return this.userAuthRepository.create();
  }

  async save(userAuth: UserAuthEntity): Promise<UserAuthEntity> {
    const newUserAuth = await this.userAuthRepository.save(userAuth);

    return newUserAuth;
  }

  async update(auth: UserAuthEntity): Promise<void> {
    await this.userAuthRepository.update({ userId: auth.userId }, auth);
  }

  async delete(userId: string): Promise<void> {
    await this.userAuthRepository.delete({ userId });
  }
}
