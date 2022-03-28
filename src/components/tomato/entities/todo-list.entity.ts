import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { AbstractEntity } from 'src/base';

@Entity({ name: 'todo-lists' })
export class TodoListEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    @Index()
    uid: number;

    @Column("text", {nullable: true, default: null})
    content: string;

    @Column("int2", { default: 1 })
    status: number
}
