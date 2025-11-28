import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { MapaCurricularService } from './mapaCurricular.service';

@Controller('mapa-curricular')
export class MapaCurricularController {
  constructor(private readonly mapaService: MapaCurricularService) { }

  @Get()
  async obtenerMapa() {
    return await this.mapaService.find();
  }

  @Put(':id')
  async actualizarMapa(
    @Param('id') id: number,
    @Body() body: { url: string }
  ) {
    return await this.mapaService.update(id, body.url);
  }
}
