import { UserAuthRepository } from './../../../libs/shared/src/repositories/user_auth';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAuthEntity, UserEntity } from '@app/entities';
import { DatabaseModule } from '@app/shared/modules';
import { UserRepository } from '@app/shared/repositories';
import { AllExceptionsFilterProvider } from '@app/shared/configs';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity, UserAuthEntity]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserAuthRepository,
    AllExceptionsFilterProvider,
  ],
})
export class UserModule {}
