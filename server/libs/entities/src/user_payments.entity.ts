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
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'manager_id' })
  managerId: number;

  @Column({ name: 'start_date' })
  startDate: number;

  @Column({ name: 'end_date' })
  endDate: number;

  @Column({ name: 'card_number', unique: true })
  cardNumber: number;
}
