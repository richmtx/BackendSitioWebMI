import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EgresadosService } from './egresados.service';
import { Egresados } from './egresados.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('egresados')
export class EgresadosController {
  constructor(private readonly egresadosService: EgresadosService) {}

  @Get()
  async getAll(): Promise<Egresados[]> {
    return this.egresadosService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Egresados> {
    return this.egresadosService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/egresados',
        filename: (req, file, callback) => {
          const originalName = file.originalname
            .split('.')
            .slice(0, -1)
            .join('.')
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_-]/g, '');

          const extension = extname(file.originalname);
          const randomId =
            Math.floor(Math.random() * 90000000) + 10000000;

          const fileName = `${randomId}-${originalName}${extension}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() updatedData: Partial<Egresados>,
    @UploadedFile() imagen?: Express.Multer.File,
  ): Promise<Egresados> {

    if (imagen) {
      updatedData.imagen = `uploads/egresados/${imagen.filename}`;
    }

    return this.egresadosService.update(id, updatedData);
  }
}
