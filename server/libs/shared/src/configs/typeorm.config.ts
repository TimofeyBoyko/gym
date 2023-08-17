import { DataSource, DataSourceOptions } from 'typeorm';

import {
  NewsEntity,
  NutritionEntity,
  TrainingEntity,
  UserAuthEntity,
  UserEntity,
  UserPaymentsEntity,
  UserSettingsEntity,
  WardEntity,
} from '@app/entities';

import { configService } from '../services';

const options = (): DataSourceOptions => {
  const dbName = configService.get('DB_NAME');
  const dbUser = configService.get('DB_USER');
  const dbPassword = configService.get('DB_PASSWORD');
  const dbPort = configService.get('DB_PORT');
  const dbHost = configService.get('DB_HOST');

  return {
    type: 'postgres',
    schema: 'public',
    // url: dbURI,
    logging: configService.get('NODE_ENV') === 'dev',
    entities: [
      // join(process.cwd(), 'dist', 'libs', 'entities', '**', '*.entity.{ts,js}'),
      UserEntity,
      UserAuthEntity,
      UserPaymentsEntity,
      UserSettingsEntity,
      TrainingEntity,
      NutritionEntity,
      WardEntity,
      NewsEntity,
    ],
    // migrations: [join(process.cwd(), 'migrations', '*migration.ts')],
    // migrationsRun: true,
    // migrationsTableName: 'migrations',
    port: dbPort,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    synchronize: true,
  };
};

export const appDataSource = new DataSource(options());
