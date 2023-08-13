import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { TrainingStatus } from '../../enums/src';

@Entity('training')
export class TrainingEntity {
  @PrimaryColumn('uuid')
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
