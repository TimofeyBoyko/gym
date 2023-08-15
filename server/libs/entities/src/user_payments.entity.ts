import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('user_payments')
export class UserPaymentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'manager_id' })
  managerId: string;

  @Column({ name: 'start_date' })
  startDate: string;

  @Column({ name: 'end_date' })
  endDate: string;

  @Column({ name: 'card_number', unique: true })
  cardNumber: number;
}
