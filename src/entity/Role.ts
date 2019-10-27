import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Role {

    @PrimaryColumn()
    id!: string;

    @Column()
    name!: string;

    @OneToMany(type => User, user => user.role)
    users!: User[];

}
