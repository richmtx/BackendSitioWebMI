import { Controller, Get, Param, Post, Body, Put, Delete, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CohorteService } from './cohorte.service';
import { Cohorte } from './cohorte.entity';
import { extname } from 'path';

@Controller('cohorte')
export class CohorteController {
  constructor(private readonly cohorteService: CohorteService) {}

  @Get()
  findAll(): Promise<Cohorte[]> {
    return this.cohorteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Cohorte | null> {
    return this.cohorteService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/cohorte',
        filename: (req, file, callback) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${unique}${ext}`);
        },
      }),
    }),
  )
  create(@Body() cohorteData: Partial<Cohorte>, @UploadedFile() imagen: Express.Multer.File) {
    if (imagen) {
      cohorteData.imagen = `cohorte/${imagen.filename}`;
    }
    return this.cohorteService.create(cohorteData);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/cohorte',
        filename: (req, file, callback) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${unique}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: number,
    @Body() cohorteData: Partial<Cohorte>,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    if (imagen) {
      cohorteData.imagen = `cohorte/${imagen.filename}`;
    }
    return this.cohorteService.update(id, cohorteData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.cohorteService.remove(id);
  }
}
