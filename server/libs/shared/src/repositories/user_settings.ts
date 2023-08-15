import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserSettingsEntity } from '@app/entities';

@Injectable()
export class UserSettingsRepository {
  constructor(
    @InjectRepository(UserSettingsEntity)
    private userSettingsRepository: Repository<UserSettingsEntity>,
  ) {}

  async get(userId: string): Promise<UserSettingsEntity> {
    const userSettings: UserSettingsEntity =
      await this.userSettingsRepository.findOneBy({
        userId,
      });

    return userSettings;
  }

  create(): UserSettingsEntity {
    return this.userSettingsRepository.create();
  }

  async save(userSettings: UserSettingsEntity): Promise<UserSettingsEntity> {
    const newUserSettings = await this.userSettingsRepository.save(
      userSettings,
    );

    return newUserSettings;
  }

  async update(settings: UserSettingsEntity): Promise<void> {
    await this.userSettingsRepository.update(
      { userId: settings.userId },
      settings,
    );
  }

  async delete(userId: string): Promise<void> {
    await this.userSettingsRepository.delete({ userId });
  }
}
