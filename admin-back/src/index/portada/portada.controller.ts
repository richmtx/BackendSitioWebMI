import { Controller, Get, Put, Param, Body, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { PortadaService } from './portada.service';
import { Portada } from './portada.entity';

@Controller('portada')
export class PortadaController {
  constructor(private readonly portadaService: PortadaService) {}

  @Get()
  async getAll(): Promise<Portada[]> {
    return this.portadaService.findAll();
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'portada');
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() portadaData: Partial<Portada>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Portada> {
    if (file) {
      portadaData.imagen = `uploads/portada/${file.filename}`;
    }

    const updated = await this.portadaService.update(id, portadaData);
    if (!updated) {
      throw new HttpException('Portada no encontrada', HttpStatus.NOT_FOUND);
    }
    return updated;
  }
}
