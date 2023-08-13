import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { NutritionStatus } from '../../enums/src';

@Entity('nutrition')
export class NutritionEntity {
  @PrimaryColumn('uuid')
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
