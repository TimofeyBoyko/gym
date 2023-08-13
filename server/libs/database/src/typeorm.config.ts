import { config } from 'dotenv';
import { join } from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

config({
  path: join(process.cwd(), '..', 'build', 'docker', '.env'),
});

const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const dbName = configService.get('DB_NAME');
  const dbUser = configService.get('DB_USER');
  const dbPassword = configService.get('DB_PASSWORD');
  const dbPort = configService.get('DB_PORT');

  return {
    type: 'postgres',
    schema: 'public',
    logging: configService.get('NODE_ENV') === 'dev',
    entities: [
      join(process.cwd(), 'dist', 'libs', 'entities', '**', '*.entity.{ts,js}'),
    ],
    migrations: [join(process.cwd(), 'migrations', '*migration.ts')],
    migrationsRun: true,
    migrationsTableName: 'migrations',
    port: dbPort,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    synchronize: false,
  };
};

console.log(options());

export const appDataSource = new DataSource(options());
