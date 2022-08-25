import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module'
import { dbConnect } from 'src/database/connection';
const PORT = process.env.PORT || 3001;

async function bootstrap() {
  dbConnect();
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
