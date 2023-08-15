import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@app/entities';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async get(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneBy({ id });

    return user;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneBy({ email });

    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.userRepository.find();

    return users;
  }

  create(): UserEntity {
    return this.userRepository.create();
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.userRepository.save(user);

    return newUser;
  }

  async update(user: UserEntity): Promise<void> {
    await this.userRepository.update({ id: user.id }, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
