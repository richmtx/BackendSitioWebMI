import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapaCurricular } from './mapaCurricular.entity';
import { MapaCurricularService } from './mapaCurricular.service';
import { MapaCurricularController } from './mapaCurricular.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MapaCurricular])],
  controllers: [MapaCurricularController],
  providers: [MapaCurricularService],
})
export class MapaCurricularModule {}
