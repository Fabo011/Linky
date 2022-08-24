import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module'
import { dbConnect } from 'src/database/connection';

async function bootstrap() {
  dbConnect();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
