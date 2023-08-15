import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  authorId: string;

  @Column()
  text: string;

  @Column({ name: 'users_type' })
  usersType: string;
}
