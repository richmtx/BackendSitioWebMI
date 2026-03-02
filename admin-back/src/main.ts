import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = process.env.PORT || 3000;

  app.enableCors({
    origin: true,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Backend corriendo en red en el puerto ${port}`);
  console.log(`🌐 CORS habilitado (modo desarrollo)`);
}

bootstrap();
