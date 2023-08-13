import { Entity, PrimaryColumn, JoinColumn, Column, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { Theme } from '../../enums/src';

@Entity('user_settings')
export class UserSettingsEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @Column({ type: 'enum', enum: Theme, default: Theme.Base })
  theme: Theme;
}
