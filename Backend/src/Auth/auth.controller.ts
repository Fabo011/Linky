import { Body, Controller, HttpCode, Injectable, Post, Res, ValidationPipe } from '@nestjs/common'
import { AuthCredentials, AuthResponse } from './auth.credentials'
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { Response } from 'express'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

@Injectable()
@Controller('auth')
export class AuthController {
        constructor(private authService: AuthService) {}
    
    @ApiTags('authentication-controller')
    @ApiCreatedResponse({ type: AuthResponse })
    @HttpCode(200)
    @Post('/v1/signup')
    async signup(@Body(ValidationPipe) authCredentials: AuthCredentials, @Body() user: User, @Res() res: Response) { 
        const { username } = authCredentials;

        try {
            await this.authService.create(user);
            const token = await this.authService.getAuthToken(username)
            res.send(token)
        } catch (error) {
            console.log(error)
            res.status(500).send('Invalid username or password')
        }
       
    };
    
    @ApiTags('authentication-controller')
    @ApiCreatedResponse({ type: AuthResponse })
    @HttpCode(200)
    @Post('/v1/signin')
    async signin(@Body(ValidationPipe) authCredentials: AuthCredentials, @Body() user: User, @Res() res: Response) {
        const { username, password } = authCredentials;
    
        try {
            const validUser = await this.authService.findUser(username)
        
            const passwordFromDatabase = validUser.password
            await this.authService.checkPassword(password, passwordFromDatabase)
        
            const token = await this.authService.getAuthToken(username)
            res.send(token)
        } catch (error) {
            console.log(error)
            res.status(401).send('Wrong username or password')
        }
        
    };

}
