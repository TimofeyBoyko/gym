import { UserPaymentsEntity } from '@app/entities';
import { appDataSource } from '../typeorm.config';
import { Injectable } from '@nestjs/common';

export const userPaymentsRepository =
  appDataSource.getRepository(UserPaymentsEntity);

@Injectable()
export class UserPaymentsRepository {
  constructor() {}

  async get(userId: number): Promise<UserPaymentsEntity> {
    const userPayments: UserPaymentsEntity =
      await userPaymentsRepository.findOneBy({
        userId,
      });

    return userPayments;
  }

  async getByCardNumber(cardNumber: number): Promise<UserPaymentsEntity> {
    const userPayments: UserPaymentsEntity =
      await userPaymentsRepository.findOneBy({
        cardNumber,
      });

    return userPayments;
  }

  create(): UserPaymentsEntity {
    return userPaymentsRepository.create();
  }

  async save(userPayments: UserPaymentsEntity): Promise<UserPaymentsEntity> {
    const newUserPayments = await userPaymentsRepository.save(userPayments);

    return newUserPayments;
  }

  async update(payments: UserPaymentsEntity): Promise<void> {
    await userPaymentsRepository.update({ userId: payments.userId }, payments);
  }

  async delete(userId: number): Promise<void> {
    await userPaymentsRepository.delete({ userId });
  }
}
