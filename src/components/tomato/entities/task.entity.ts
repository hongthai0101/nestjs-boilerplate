import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { AbstractEntity } from 'src/base';

@Entity({ name: 'tasks' })
export class TaskEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    @Index()
    uid: number;

    @Column('varchar', { length: 255 })
    content: string;

    @Column("jsonb", { nullable: true, default: null })
    images: Array<string>

    @Column('bigint')
    date: number

    @Column("int2", { default: 1 })
    type: number

    @Column("int2", { default: 0 })
    count: number
}
