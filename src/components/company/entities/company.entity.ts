import { Column, Entity, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';
import { AbstractEntity } from 'src/base';

@Entity({ name: 'companies' })
export class CompanyEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  @Index()
  uid: number;

  @Column('decimal', { precision: 9, scale: 2, nullable: false })
  amount: number;

  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @Column('varchar', { length: 255 })
  remark: string;

  @CreateDateColumn({ type: 'timestamp'})
  startDate: Date

  @CreateDateColumn({ type: 'timestamp'})
  endDate: Date

  @CreateDateColumn({ type: 'timestamp'})
  expectLeaveDate: Date
}
