import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TrainingStatus } from '../../enums/src';

@Entity('training')
export class TrainingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column()
  data: string;

  @Column({ name: 'start_date' })
  startDate: string;

  @Column({ name: 'finish_date' })
  finishDate: string;

  @Column()
  type: string;

  @Column({
    type: 'enum',
    enum: TrainingStatus,
    default: TrainingStatus.inProgress,
  })
  status: TrainingStatus;
}
