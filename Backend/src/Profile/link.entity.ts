import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Link {

@PrimaryGeneratedColumn()
id: number

@Column({name: 'username', nullable: false})
username: string

@Column({name: 'linkname', nullable: false})
linkname: string

@Column({name: 'link', nullable: false})
link: string

}