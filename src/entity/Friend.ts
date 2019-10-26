import {Entity, PrimaryColumn, Column, JoinTable, ManyToMany} from "typeorm";

@Entity()
export class Friend {

    @PrimaryColumn()
    url!: string;

    @Column()
    imgPath!: string;

    @Column("text")
    description!: string;

    @Column()
    title!: string;

    @Column()
    tags!: string;


}
