import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('news')
export class NewsEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  authorId: string;

  @Column()
  text: string;

  @Column({ name: 'users_type' })
  usersType: string;
}
