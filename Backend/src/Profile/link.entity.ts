import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Link {

@ApiProperty()    
@PrimaryGeneratedColumn()
id: number

@ApiProperty()
@Column({name: 'username', nullable: false})
username: string

@ApiProperty()
@Column({name: 'linkname', nullable: false})
linkname: string

@ApiProperty()
@Column({name: 'link', nullable: false})
link: string

@ApiProperty()
@Column({name: 'category', nullable: false})
category: string

}