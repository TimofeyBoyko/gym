import { UserEntity } from '@app/entities';
import { appDataSource } from '../typeorm.config';
import { Injectable } from '@nestjs/common';

export const userRepository = appDataSource.getRepository(UserEntity);

@Injectable()
export class UserRepository {
  constructor() {}

  async get(id: number): Promise<UserEntity> {
    const user: UserEntity = await userRepository.findOneBy({ id });

    return user;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await userRepository.findOneBy({ email });

    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = await userRepository.find();

    return users;
  }

  create(): UserEntity {
    return userRepository.create();
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const newUser = await userRepository.save(user);

    return newUser;
  }

  async update(user: UserEntity): Promise<void> {
    await userRepository.update({ id: user.id }, user);
  }

  async delete(id: number): Promise<void> {
    await userRepository.delete({ id });
  }
}
