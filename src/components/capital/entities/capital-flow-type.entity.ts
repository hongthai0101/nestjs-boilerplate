import { Column, Entity, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/base';
import { CapitalFlowEntity } from './capital-flow.entity';

@Entity({ name: 'capital-flow-types' })
export class CapitalFlowTypeEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  uid: number;

  @Column("int2", { default: 0 })
  sortIndex: number;

  @Column('int2', { default: 0 })
  type: number;

  @Column('varchar', { length: 20 })
  name: string;

  @OneToMany(() => CapitalFlowEntity, flow => flow.type)
  flows: CapitalFlowEntity[];
}
