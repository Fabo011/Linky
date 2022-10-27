import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, Table } from "typeorm";
import * as bcrypt from 'bcrypt'


@Entity()
export class User {

@PrimaryGeneratedColumn()
id: number

@Column({name: 'username', nullable: false, unique: true})
username: string

@BeforeInsert()
hashPassword() {
    const Salt = 10;
    const hashedPassword = bcrypt.hash(this.password, Salt);
    //this.password = hashedPassword;
    //Todo: Hash password not working
}
@Column({name: 'password', nullable: false})
password: string 


}

