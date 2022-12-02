import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LinkCredentials{

@IsString()
@IsNotEmpty()
@MaxLength(12, { message: 'Username is too long' })
username: string    

@IsString()
@MinLength(3, { message: 'Linkname must have atleast 4 characters!' })
@MaxLength(50, { message: 'Linkname is too long, make sure that you have not more then 12 characters!' })
linkname: string

@IsString()
@MinLength(3, { message: 'Link must have atleast 4 characters!' })
@MaxLength(500, { message: 'link is too long, make sure that you have not more then 20 characters!' })
link: string

@IsString()
@IsNotEmpty()
token: string

@IsString()
@IsNotEmpty()
url: string

}