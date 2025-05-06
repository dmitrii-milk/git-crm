import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', {
    exclude: ['/health'], // Exclude health endpoint from global prefix for Docker healthcheck
  });
  app.enableCors({
    origin: '*', // Replace with your client's origin
    credentials: true,
  });
  const config = app.get(ConfigService);
  await app.listen(config.get('port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
