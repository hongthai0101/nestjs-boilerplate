import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { AbstractEntity } from 'src/base';

@Entity({ name: 'user-configures' })
export class UserConfigureEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    @Index()
    uid: number;

    @Column("boolean")
    isTaskNotify: boolean;

    @Column("boolean")
    isMatterNotify: boolean;

    @Column("varchar",  { length: 255 })
    serverChanSckey: number
}
