import {Entity, PrimaryColumn, Column, JoinTable, ManyToMany} from "typeorm";

@Entity()
export class Comment {

    @PrimaryColumn()
    articleId!: string;

    @PrimaryColumn()
    author!: string;

    @Column()
    email!: string;

    @Column("text")
    content!: string;
    
    @Column()
    time!: string;

    @Column()
    visible!: boolean;    
}
