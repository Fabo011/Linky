import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}    
  
@Post('/register')
  async register(@Req() req: Request) {
    const data: any = req.body;  

    await this.authService.usernameValidation(data.username);
  }

}


