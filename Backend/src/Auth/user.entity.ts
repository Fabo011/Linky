import { Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm"

@Entity()
export class User {

@PrimaryGeneratedColumn()
id: number

@Column({name: 'username', nullable: false, unique: true})
username: string

@Column({name: 'password', nullable: false})
password: string

}

