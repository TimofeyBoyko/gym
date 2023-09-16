import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserEntity } from '@app/entities';
import { UserRepository, UserAuthRepository } from '@app/shared/repositories';
import { UserActivationStatus, UserStatus, UserType } from '@app/shared/enums';
import { DEFAULT_IMAGE, BCRYPT_SALT } from '@app/shared/constants';

import { RegistrationDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(UserRepository) private userRepository: UserRepository,
    @Inject(UserAuthRepository) private userAuthRepository: UserAuthRepository,
  ) {}

  async createUser(userInfo: RegistrationDto): Promise<UserEntity> {
    const user = this.userRepository.create();

    user.email = userInfo.email;
    user.lastName = userInfo.lastName;
    user.firstName = userInfo.firstName;
    user.birthday = userInfo.birthday;

    user.createdAt = new Date().toISOString();

    user.activationStatus = UserActivationStatus.Pending;
    user.status = UserStatus.Default;
    user.type = UserType.visitor;

    user.photo = DEFAULT_IMAGE;

    return user;
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new Error('NotFound');
    }

    const auth = await this.userAuthRepository.get(user.id);

    if (!auth) {
      throw new Error('NotFound');
    }

    const isSame = await bcrypt.compare(password, auth.passwordHash);

    if (!isSame) {
      throw new Error('WrongPassword');
    }

    return user;
  }

  async checkEmail(email: string) {
    const user: UserEntity = await this.userRepository.getByEmail(email);

    if (user) {
      throw new Error();
    }
  }

  async generateHashPassword(password: string): Promise<string> {
    const bcryptSalt = await bcrypt.genSalt(BCRYPT_SALT);

    const hashPassword = await bcrypt.hash(password, bcryptSalt);

    return hashPassword;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);

    const payload = { id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(
    email: string,
    password: string,
    dto: RegistrationDto,
  ): Promise<void> {
    try {
      await this.checkEmail(email);

      const userInfo = await this.createUser(dto);

      const { id } = await this.userRepository.save(userInfo);

      const hashPassword = await this.generateHashPassword(password);

      const auth = this.userAuthRepository.create();

      auth.userId = id;
      auth.passwordHash = hashPassword;

      await this.userAuthRepository.save(auth);
    } catch (e) {
      throw new Error(e);
    }
  }
}
