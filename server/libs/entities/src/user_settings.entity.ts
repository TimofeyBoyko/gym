import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Theme } from '../../enums/src';

@Entity('user_settings')
export class UserSettingsEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({ type: 'enum', enum: Theme, default: Theme.Base })
  theme: Theme;
}
