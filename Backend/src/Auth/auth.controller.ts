import { Body, Controller, Injectable, Post, Req, Res, ValidationPipe } from '@nestjs/common'
import { AuthCredentials } from './auth.credentials'
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Injectable()
@Controller('auth')
export class AuthController {
        constructor(private authService: AuthService) {}
    
    @Post('/v1/signup')
    async signup(@Body(ValidationPipe) authCredentials: AuthCredentials, @Body() user: User) { 
        const { username } = authCredentials;
    
        //await this.authService.usernameValidation(username);

        //const hashedPassword = await this.authService.hashPassword(password);

        await this.authService.create(user);
        // Todo: 
        // 3) save username and password in database
        // 4) response with JWT-Token
    }
    
    @Post('/v1/signin')
    async signin(@Body(ValidationPipe) authCredentials: AuthCredentials) {
        const { username, password } = authCredentials;
    
        //await this.authService.usernameValidation(username);
        // Todo:
        // 1) find user by username
        // 2) check password
        // 3) response JWT-Token
    }

}
