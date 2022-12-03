import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { checkAuthTokenMiddleware } from 'src/middleware/checkAuthToken.middleware';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkAuthTokenMiddleware)
      .forRoutes('profile/v1/addNewLink');
  }

}
