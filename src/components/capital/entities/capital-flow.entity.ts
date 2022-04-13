import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { CapitalFlowTypeEntity } from './capital-flow-type.entity';
import { AbstractEntity } from 'src/base';

@Entity({ name: 'capital_flows' })
export class CapitalFlowEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  uid: number;

  @Column('decimal', { precision: 9, scale: 2 })
  price: number;

  @ManyToOne(() => CapitalFlowTypeEntity)
  @JoinTable({ name: 'typeId' })
  type: CapitalFlowTypeEntity;

  @Column('varchar', { length: 255 })
  remark: string;
}
