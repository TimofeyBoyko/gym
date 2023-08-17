import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserAuthEntity, UserEntity } from '@app/entities';
import { DatabaseModule } from '@app/shared/modules';
import { UserRepository, UserAuthRepository } from '@app/shared/repositories';
import { jwtOptions } from '@app/shared/configs';
import { AllExceptionsFilterProvider } from '@app/shared/providers';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({ ...jwtOptions, global: false }),
    TypeOrmModule.forFeature([UserEntity, UserAuthEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    UserAuthRepository,
    AllExceptionsFilterProvider,
  ],
})
export class AuthModule {}
