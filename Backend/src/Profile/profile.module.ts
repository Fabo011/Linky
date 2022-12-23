import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { checkAuthTokenMiddleware } from 'src/middleware/checkAuthToken.middleware';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Auth/user.entity';
import { Link } from './link.entity';

@Module({
  imports: [
            AuthModule, TypeOrmModule.forFeature([User]), 
            TypeOrmModule.forFeature([Link])
           ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkAuthTokenMiddleware)
      .forRoutes('profile/v1/addNewLink');
  }

};
