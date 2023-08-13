import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('ward')
export class WardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'coach_id' })
  coachId: string;
}
