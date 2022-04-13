import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { AbstractEntity } from 'src/base';

@Entity({ name: 'user_configures' })
export class UserConfigureEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    @Index()
    uid: number;

    @Column("boolean", {default: false})
    isTaskNotify: boolean;

    @Column("boolean", {default: false})
    isMatterNotify: boolean;

    @Column("varchar",  { length: 255 })
    serverChanSckey: number
}
