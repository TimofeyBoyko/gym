import { UserSettingsEntity } from '@app/entities';
import { appDataSource } from '../typeorm.config';
import { Injectable } from '@nestjs/common';

export const userSettingsRepository =
  appDataSource.getRepository(UserSettingsEntity);

@Injectable()
export class UserSettingsRepository {
  constructor() {}

  async get(userId: number): Promise<UserSettingsEntity> {
    const userSettings: UserSettingsEntity =
      await userSettingsRepository.findOneBy({
        userId,
      });

    return userSettings;
  }

  create(): UserSettingsEntity {
    return userSettingsRepository.create();
  }

  async save(userSettings: UserSettingsEntity): Promise<UserSettingsEntity> {
    const newUserSettings = await userSettingsRepository.save(userSettings);

    return newUserSettings;
  }

  async update(settings: UserSettingsEntity): Promise<void> {
    await userSettingsRepository.update({ userId: settings.userId }, settings);
  }

  async delete(userId: number): Promise<void> {
    await userSettingsRepository.delete({ userId });
  }
}
