import { AuthModule } from './Auth/auth.module';
import { AuthController } from './Auth/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

@Module({
  imports: [
  AuthModule, 
  TypeOrmModule.forRoot({
    'type': 'postgres',
    'host': 'localhost',
    'port': 5432,
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'entities': ['dist/**/*.entity{.ts,.js}'],
    "synchronize": true,
  }), AuthModule          
  ],
  controllers: [AuthController, AppController],
  providers: [AppService],
})
export class AppModule {}
