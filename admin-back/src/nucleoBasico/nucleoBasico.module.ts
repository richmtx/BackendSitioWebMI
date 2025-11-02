import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NucleoBasico } from './nucleoBasico.entity';
import { CvuEnlace } from './cvuEnlace.entity';
import { NucleoBasicoService } from './nucleoBasico.service';
import { NucleoBasicoController } from './nucleoBasico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NucleoBasico, CvuEnlace])],
  controllers: [NucleoBasicoController],
  providers: [NucleoBasicoService],
})
export class NucleoBasicoModule {}
