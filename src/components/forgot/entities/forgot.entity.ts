import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { Allow } from 'class-validator';
import { AbstractEntity } from 'src/base';

@Entity()
export class ForgotEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Allow()
  @Column()
  @Index()
  hash: string;

  @Allow()
  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  user: UserEntity;

  @DeleteDateColumn()
  deletedAt: Date;
}
