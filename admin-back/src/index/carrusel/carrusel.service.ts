import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrusel } from './carrusel.entity';

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class CarruselService {
  constructor(
    @InjectRepository(Carrusel)
    private carruselRepo: Repository<Carrusel>,
  ) { }

  async getCarrusel(): Promise<any[]> {
    const items = await this.carruselRepo.find();

    return items.map((item) => {
      let imagenBase64: string | null = null;

      if (item.imagen) {
        const imagePath = join(process.cwd(), item.imagen);

        if (existsSync(imagePath)) {
          const file = readFileSync(imagePath);
          const base64 = file.toString('base64');

          const ext = item.imagen.split('.').pop() || 'png';

          imagenBase64 = `data:image/${ext};base64,${base64}`;
        }
      }

      return {
        ...item,
        imagen: imagenBase64,
      };
    });
  }

  async updateImagen(id: number, imagen: string): Promise<Carrusel> {
    const item = await this.carruselRepo.findOne({ where: { id_carrusel: id } });

    if (!item) {
      throw new NotFoundException(`No existe un registro con id ${id}`);
    }

    item.imagen = imagen;
    return this.carruselRepo.save(item);
  }
}
