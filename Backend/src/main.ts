import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthModule } from './Auth/auth.module';
import { ProfileModule } from './profile/profile.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());

  const config = new DocumentBuilder()
  .setTitle('Linky')
  .setDescription('Linky is a useful cloud tool to store your links secure and anonymous.')
  .setVersion('1.0')
  .addTag('authentication-controller')
  .addTag('profile-controller')
  .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, ProfileModule]
  });
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
