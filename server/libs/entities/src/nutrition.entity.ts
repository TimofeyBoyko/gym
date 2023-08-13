import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { NutritionStatus } from '../../enums/src';

@Entity('nutrition')
export class NutritionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userId: number;

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
