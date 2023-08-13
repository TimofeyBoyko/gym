import { UserAuthEntity } from '@app/entities';
import { appDataSource } from '../typeorm.config';
import { Injectable } from '@nestjs/common';

export const userAuthRepository = appDataSource.getRepository(UserAuthEntity);

@Injectable()
export class UserAuthRepository {
  constructor() {}

  async get(userId: number): Promise<UserAuthEntity> {
    const userAuth: UserAuthEntity = await userAuthRepository.findOneBy({
      userId,
    });

    return userAuth;
  }

  create(): UserAuthEntity {
    return userAuthRepository.create();
  }

  async save(userAuth: UserAuthEntity): Promise<UserAuthEntity> {
    const newUserAuth = await userAuthRepository.save(userAuth);

    return newUserAuth;
  }

  async update(auth: UserAuthEntity): Promise<void> {
    await userAuthRepository.update({ userId: auth.userId }, auth);
  }

  async delete(userId: number): Promise<void> {
    await userAuthRepository.delete({ userId });
  }
}
