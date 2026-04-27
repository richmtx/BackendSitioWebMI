import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrusel } from './carrusel.entity';
import { imagenABase64 } from '../../utils/imagen.helper';

@Injectable()
export class CarruselService {
  constructor(
    @InjectRepository(Carrusel)
    private carruselRepo: Repository<Carrusel>,
  ) { }

  async getCarrusel(): Promise<any[]> {
    const items = await this.carruselRepo.find();
    return items.map((item) => ({
      ...item,
      imagen: imagenABase64(item.imagen),
    }));
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