import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*', // Replace with your client's origin
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
