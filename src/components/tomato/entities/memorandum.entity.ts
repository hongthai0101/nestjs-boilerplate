import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { AbstractEntity } from 'src/base';

@Entity({ name: 'memorandums' })
export class MemorandumEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    @Index()
    uid: number;

    @Column("int2", {default: 0})
    sortIndex: number;

    @Column('varchar', { length: 255 })
    title: string;

    @Column("text")
    markdown: string;
}
