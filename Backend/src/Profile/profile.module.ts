import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { checkAuthTokenMiddleware } from 'src/middleware/checkAuthToken.middleware';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Auth/user.entity';
import { Link } from './link.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
            AuthModule, TypeOrmModule.forFeature([User]), 
            TypeOrmModule.forFeature([Link]),
            HttpModule
           ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkAuthTokenMiddleware)
      .forRoutes('profile/v1/addNewLink', 'profile/v1/deleteLink');
  }

};
