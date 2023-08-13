import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_auth')
export class UserAuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'password_hash' })
  passwordHash: string;
}
