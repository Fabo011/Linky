import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LinkCredentials{

@ApiProperty()    
@IsString()
@IsNotEmpty()
@MaxLength(12, { message: 'Username is too long' })
username: string    

@ApiProperty()
@IsString()
@MinLength(3, { message: 'Linkname must have atleast 4 characters!' })
@MaxLength(50, { message: 'Linkname is too long, make sure that you have not more then 12 characters!' })
linkname: string

@ApiProperty()
@IsString()
@MinLength(5, { message: 'Link must have atleast 5 characters!' })
@MaxLength(800, { message: 'link is too long, make sure that you have not more then 20 characters!' })
link: string

@ApiProperty()
@IsString()
@MinLength(3, { message: 'Category must have atleast 3 characters!' })
@MaxLength(15, { message: 'Category naming is too long, make sure that you have not more then 15 characters!' })
category: string

@ApiProperty()
@IsString()
@IsNotEmpty()
token: string

}