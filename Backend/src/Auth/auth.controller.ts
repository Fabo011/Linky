import { Body, Controller, Injectable, Post, Redirect, Req, Res, ValidationPipe } from '@nestjs/common'
import { AuthCredentials } from './auth.credentials'
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { Request, Response } from 'express'

@Injectable()
@Controller('auth')
export class AuthController {
        constructor(private authService: AuthService) {}
    
    @Post('/v1/signup')
    async signup(@Body(ValidationPipe) authCredentials: AuthCredentials, @Body() user: User, @Res() res: Response) { 
        const { username } = authCredentials;

        await this.authService.create(user);

        const token = await this.authService.getAuthToken(username);
        
        res.send(token);
    }
    
    @Post('/v1/signin')
    async signin(@Body(ValidationPipe) authCredentials: AuthCredentials, @Body() user: User, @Res() res: Response) {
        const { username, password } = authCredentials;
    
        const validUser = await this.authService.findUser(username);
        
        const passwordFromDatabase = validUser.password;
        await this.authService.checkPassword(password, passwordFromDatabase);
        
        const token = await this.authService.getAuthToken(username);
        
        res.send(token);
    }

    @Post('/v1/check')
    async checkToken(@Req() req: Request, @Res() res: Response) {
        const token = req.body.token;
        
        try {
           await this.authService.checkToken(token); 
        } catch (error) {
           console.log(error);
           return res.status(401).send('Invalid token');
        }
    }

}
