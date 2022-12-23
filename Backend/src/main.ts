import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthModule } from './Auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());

  app.use(['/swagger', '/docs-json'], basicAuth({
    challenge: true,
    users: {
      [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
    },
  }));
  
  const config = new DocumentBuilder()
  .setTitle('Linky')
  .setDescription('Linky is a useful cloud tool to store your links secure and anonymous. Linky checks links against maleware.')
  .setVersion('1.0')
  .addTag('authentication-controller')
  .addTag('profile-controller')
  .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, ProfileModule]
  });
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);
}
bootstrap();


