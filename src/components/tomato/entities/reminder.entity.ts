import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { AbstractEntity } from 'src/base';

@Entity({ name: 'reminders' })
export class ReminderEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    @Index()
    uid: number;

    @Column('varchar', { length: 255 })
    content: string;

    @Column("smallint", {default: 1})
    type: number
}
