import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { NucleoBasicoService } from './nucleoBasico.service';
import { NucleoBasico } from './nucleoBasico.entity';

@Controller('nucleo-basico')
export class NucleoBasicoController {
  constructor(private readonly nucleoBasicoService: NucleoBasicoService) { }

  @Get()
  async obtenerTodos() {
    return await this.nucleoBasicoService.obtenerTodos();
  }

  @Post()
  async crearRegistro(@Body() datos: NucleoBasico) {
    return await this.nucleoBasicoService.crearRegistro(datos);
  }

  @Put(':id')
  async actualizarRegistro(@Param('id') id: number, @Body() datos: NucleoBasico) {
    return await this.nucleoBasicoService.actualizarRegistro(id, datos);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.nucleoBasicoService.delete(+id);
  }
}
