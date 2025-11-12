import { Controller, Get, Param, Post, Body, Put, Delete, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GaleriaService } from './galeria.service';
import { Galeria } from './galeria.entity';
import { extname } from 'path';

@Controller('galeria')
export class GaleriaController {
  constructor(private readonly galeriaService: GaleriaService) {}

  @Get()
  findAll(): Promise<Galeria[]> {
    return this.galeriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Galeria | null> {
    return this.galeriaService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Galeria>): Promise<Galeria> {
    return this.galeriaService.create(data);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/galeria',
        filename: (req, file, cb) => {
          const nombreUnico = `${Date.now()}-${file.originalname}`;
          cb(null, nombreUnico);
        },
      }),
    }),
  )
  async createConImagen(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: Partial<Galeria>,
  ): Promise<Galeria> {
    data.imagen = file ? `uploads/galeria/${file.filename}` : null;
    return this.galeriaService.create(data);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/galeria',
        filename: (req, file, cb) => {
          const nombreUnico = `${Date.now()}-${file.originalname}`;
          cb(null, nombreUnico);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: Partial<Galeria>,
  ): Promise<Galeria | { message: string }> {
    if (file) {
      data.imagen = `uploads/galeria/${file.filename}`;
    }

    const resultado = await this.galeriaService.update(id, data);
    if (!resultado) {
      return { message: 'Galería no encontrada' };
    }

    return resultado;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const eliminado = await this.galeriaService.remove(id);
    if (eliminado) {
      return { message: 'Galería eliminada correctamente' };
    } else {
      return { message: 'Galería no encontrada' };
    }
  }
}
