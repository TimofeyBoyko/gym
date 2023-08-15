import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { NutritionStatus } from '@app/shared/enums';

import { UserEntity } from './user.entity';

@Entity('nutrition')
export class NutritionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: string;

  @Column()
  data: string;

  @Column()
  date: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: NutritionStatus,
    default: NutritionStatus.waiting,
  })
  status: NutritionStatus;
}
