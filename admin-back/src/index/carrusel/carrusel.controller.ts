import { Controller, Get, Put, Param, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { CarruselService } from './carrusel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('carrusel')
export class CarruselController {
  constructor(private readonly carruselService: CarruselService) {}

  @Get()
  getCarrusel() {
    return this.carruselService.getCarrusel();
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/carrusel',
        filename: (req, file, callback) => {

          const timestamp = Date.now();
          const originalName = file.originalname
            .split(' ')
            .join('-')
            .toLowerCase();
          const ext = extname(originalName);
          const baseName = originalName.replace(ext, '');
          const finalName = `${timestamp}-${baseName}${ext}`;

          callback(null, finalName);
        },
      }),
    }),
  )
  updateCarrusel(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return { message: 'No se envió ninguna imagen.' };
    }

    const rutaImagen = `uploads/carrusel/${file.filename}`;

    return this.carruselService.updateImagen(id, rutaImagen);
  }
}
