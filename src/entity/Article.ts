import {Entity, PrimaryColumn, Column, ManyToMany, JoinTable} from "typeorm";

@Entity()
export class Article {

    @PrimaryColumn()
    id!: string;

    @Column()
    time!: string;

    @Column()
    visible!: boolean;

    @Column("text")
    title!: string;

    @Column()
    tags!: string;

    @Column("text")
    description!: string;

    @Column("text")
    content!: string;

}
