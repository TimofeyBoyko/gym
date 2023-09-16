import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserAuthEntity, UserEntity } from '@app/entities';
import { DatabaseModule } from '@app/shared/modules';
import { UserRepository, UserAuthRepository } from '@app/shared/repositories';
import {
  AllExceptionsFilterProvider,
  AuthProvider,
} from '@app/shared/providers';
import { jwtOptions } from '@app/shared/configs';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity, UserAuthEntity]),
    JwtModule.register({ ...jwtOptions }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserAuthRepository,
    AuthProvider,
    AllExceptionsFilterProvider,
  ],
})
export class UserModule {}
