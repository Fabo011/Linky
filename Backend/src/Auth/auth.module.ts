import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { User } from './user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import 'dotenv/config';

@Module({
    imports: [TypeOrmModule.forFeature([User]),

    JwtModule.register({
        secret: process.env.JWT_TOKEN,
        signOptions: { expiresIn: '24h' },
      }),

    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
