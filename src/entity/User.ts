import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {

    @PrimaryColumn()
    id!: string;

    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column()
    name!: string;

    @ManyToOne(type => Role, role => role.users)
    role!: Role;
}
