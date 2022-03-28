import { Column, Entity, PrimaryGeneratedColumn, Index, ManyToOne, JoinTable } from 'typeorm';
import { AbstractEntity } from 'src/base';
import { CompanyEntity } from 'src/components/company/entities';

@Entity({ name: 'logs' })
export class LogEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @Index()
    uid: number;

    @ManyToOne(() => CompanyEntity)
    @JoinTable({ name: 'companyId' })
    company: CompanyEntity;

    @Column("int2")
    logType: number

    @Column('varchar', { length: 255 })
    doneContent: string;

    @Column('varchar', { length: 255 })
    undoneContent: string;

    @Column('varchar', { length: 255 })
    planContent: string;

    @Column('varchar', { length: 255 })
    summaryContent: string;
}
