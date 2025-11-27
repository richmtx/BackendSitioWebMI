import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
  const port = process.env.PORT || 3000;

  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
  console.log(`🌐 CORS habilitado para: ${frontendUrl}`);
}

bootstrap();
