import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { NucleoBasicoService } from './nucleoBasico.service';
import { NucleoBasico } from './nucleoBasico.entity';

@Controller('nucleo-basico')
export class NucleoBasicoController {
  constructor(private readonly nucleoBasicoService: NucleoBasicoService) {}

  // =========================
  // GET
  // =========================
  @Get()
  async obtenerTodos() {
    return await this.nucleoBasicoService.obtenerTodos();
  }

  // =========================
  // POST (Crear con imagen)
  // =========================
  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/nucleoBasico',
        filename: (req, file, callback) => {
          const timestamp = Date.now();
          const originalName = file.originalname
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9._-]/g, '');

          callback(null, `${timestamp}-${originalName}`);
        },
      }),
    }),
  )
  async crearRegistro(
    @Body() datos: NucleoBasico,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    if (imagen) {
      datos.imagen = `uploads/nucleoBasico/${imagen.filename}`;
    }
    return await this.nucleoBasicoService.crearRegistro(datos);
  }

  // =========================
  // PUT (Actualizar con imagen)
  // =========================
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/nucleoBasico',
        filename: (req, file, callback) => {
          const timestamp = Date.now();
          const originalName = file.originalname
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9._-]/g, '');

          callback(null, `${timestamp}-${originalName}`);
        },
      }),
    }),
  )
  async actualizarRegistro(
    @Param('id') id: number,
    @Body() datos: NucleoBasico,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    if (imagen) {
      datos.imagen = `uploads/nucleoBasico/${imagen.filename}`;
    }
    return await this.nucleoBasicoService.actualizarRegistro(id, datos);
  }

  // =========================
  // DELETE
  // =========================
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.nucleoBasicoService.delete(+id);
  }
}
