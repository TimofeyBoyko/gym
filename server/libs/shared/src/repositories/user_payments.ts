import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPaymentsEntity } from '@app/entities';

@Injectable()
export class UserPaymentsRepository {
  constructor(
    @InjectRepository(UserPaymentsEntity)
    private userPaymentsRepository: Repository<UserPaymentsEntity>,
  ) {}

  async get(userId: string): Promise<UserPaymentsEntity> {
    const userPayments: UserPaymentsEntity =
      await this.userPaymentsRepository.findOneBy({
        userId,
      });

    return userPayments;
  }

  async getByCardNumber(cardNumber: number): Promise<UserPaymentsEntity> {
    const userPayments: UserPaymentsEntity =
      await this.userPaymentsRepository.findOneBy({
        cardNumber,
      });

    return userPayments;
  }

  create(): UserPaymentsEntity {
    return this.userPaymentsRepository.create();
  }

  async save(userPayments: UserPaymentsEntity): Promise<UserPaymentsEntity> {
    const newUserPayments = await this.userPaymentsRepository.save(
      userPayments,
    );

    return newUserPayments;
  }

  async update(payments: UserPaymentsEntity): Promise<void> {
    await this.userPaymentsRepository.update(
      { userId: payments.userId },
      payments,
    );
  }

  async delete(userId: string): Promise<void> {
    await this.userPaymentsRepository.delete({ userId });
  }
}
