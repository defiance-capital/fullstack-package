import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './framework/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS_ALLOW_ORIGIN || '*',
      credentials: true,
    },
  });

  app.use(cookieParser());
  app.setGlobalPrefix('api').enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
