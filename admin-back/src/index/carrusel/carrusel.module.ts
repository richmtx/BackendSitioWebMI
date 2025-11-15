import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrusel } from './carrusel.entity';
import { CarruselService } from './carrusel.service';
import { CarruselController } from './carrusel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Carrusel])],
  controllers: [CarruselController],
  providers: [CarruselService],
})
export class CarruselModule {}
