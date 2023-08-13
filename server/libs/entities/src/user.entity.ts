import { Entity, PrimaryColumn, Column } from 'typeorm';
import { UserActivationStatus, UserStatus, UserType } from '../../enums/src';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  birthday: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.visitor })
  type: UserType;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Default })
  status: UserStatus;

  @Column({
    name: 'activation_status',
    type: 'enum',
    enum: UserActivationStatus,
    default: UserActivationStatus.Pending,
  })
  activationStatus: UserActivationStatus;

  @Column()
  photo: string;
}
