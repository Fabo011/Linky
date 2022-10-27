import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { User } from './user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
