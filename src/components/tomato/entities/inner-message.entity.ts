import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { AbstractEntity } from 'src/base';

@Entity({ name: 'inner_messages' })
export class InnerMessageEntity extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    @Index()
    uid: number;

    @Column('varchar', { length: 255 })
    content: string;

    @Column("int2")
    type: number

    @Column("boolean")
    hasRead: boolean
}
