import { Entity, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('ward')
export class WardEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'coach_id' })
  coachId: string;
}
