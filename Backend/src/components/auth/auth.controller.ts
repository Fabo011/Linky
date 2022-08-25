import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}    
  
@HttpCode(200)
@Post('/register')
  async register(@Req() req, @Res() res) {
    const data: any = req.body;  
    
    await this.authService.usernameValidation(data.username);
    
    await this.authService.passwordValidation(data.password);

    const hash = await this.authService.hashPassword(data.password);

    await this.authService.saveUserInDatabase(data.username, hash);

    await res.send('User successfully registered!');
  }

  @HttpCode(200)
  @Post('/register')
  async login(@Req() req, @Res() res){
    //Todo next: Implement login logic
  }

}


