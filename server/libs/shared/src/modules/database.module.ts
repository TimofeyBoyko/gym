import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appDataSource } from '@app/shared/configs';

@Module({
  imports: [TypeOrmModule.forRoot(appDataSource.options)],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
