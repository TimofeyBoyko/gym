import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { TrainingStatus } from '@app/shared/enums';

import { UserEntity } from './user.entity';

@Entity('training')
export class TrainingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;

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
