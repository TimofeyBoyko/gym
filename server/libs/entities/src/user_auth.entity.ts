import { Entity, PrimaryColumn, JoinColumn, Column, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_auth')
export class UserAuthEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;
}
