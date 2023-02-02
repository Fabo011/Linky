import { AuthModule } from './Auth/auth.module';
import { AuthController } from './Auth/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './Profile/profile.module';
import 'dotenv/config';
import { ProfileController } from './Profile/profile.controller';

@Module({
  imports: [
  AuthModule, 
  TypeOrmModule.forRoot({
    'type': 'postgres',
    //'host': process.env.DB_HOST,
    'database': process.env.DB_NAME,
    'port': 5432,
    'username': process.env.DB_USERNAME_DEV,
    'password': process.env.DB_PASSWORD_DEV,
    'entities': ['dist/**/*.entity{.ts,.js}'],
    "synchronize": true,
    //"ssl": true
  }), AuthModule, ProfileModule          
  ],
  controllers: [AuthController, AppController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
