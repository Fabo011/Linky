import { IsString, MaxLength, MinLength } from "class-validator";
export class AuthCredentials{

@IsString()
@MinLength(4, { message: 'Username must have atleast 4 characters!' })
@MaxLength(12, { message: 'Username is too long, make sure that you have not more then 12 characters!' })
username: string

@IsString()
@MinLength(8, { message: 'Password must have atleast 8 characters!' })
@MaxLength(25, { message: 'Password is too long, make sure that you have not more then 20 characters!' })
password: string

}