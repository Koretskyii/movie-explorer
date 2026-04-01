import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  // Use HTTPS only in development (local environment)
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const httpsOptions = isDevelopment
    ? {
        key: fs.readFileSync('./certs/cert.key'),
        cert: fs.readFileSync('./certs/cert.crt'),
      }
    : undefined;

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  // Allow multiple origins for CORS (production + local development)
  const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',')
    : 'https://localhost:3001';

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3011);
}

bootstrap(); // eslint-disable-line
