import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('ward')
export class WardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'coach_id' })
  coachId: string;
}
