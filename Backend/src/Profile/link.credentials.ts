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
@MinLength(3, { message: 'Link must have atleast 4 characters!' })
@MaxLength(500, { message: 'link is too long, make sure that you have not more then 20 characters!' })
link: string

@ApiProperty()
@IsString()
@IsNotEmpty()
token: string

}