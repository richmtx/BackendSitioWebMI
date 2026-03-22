import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Galeria } from './galeria.entity';

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class GaleriaService {
  constructor(
    @InjectRepository(Galeria)
    private readonly galeriaRepository: Repository<Galeria>,
  ) { }

  async findAll(): Promise<any[]> {
    const galerias = await this.galeriaRepository.find();

    return galerias.map((item) => {
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

  async findOne(id: number): Promise<any | null> {
    const item = await this.galeriaRepository.findOneBy({ id_galeria: id });

    if (!item) return null;

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
  }

  // POST
  create(data: Partial<Galeria>): Promise<Galeria> {
    const nuevaGaleria = this.galeriaRepository.create(data);
    return this.galeriaRepository.save(nuevaGaleria);
  }

  // PUT
  async update(id: number, data: Partial<Galeria>): Promise<Galeria | null> {
    const galeriaExistente = await this.galeriaRepository.findOneBy({ id_galeria: id });
    if (!galeriaExistente) {
      return null;
    }
    const galeriaActualizada = this.galeriaRepository.merge(galeriaExistente, data);
    return this.galeriaRepository.save(galeriaActualizada);
  }

  // DELETE
  async remove(id: number): Promise<boolean> {
    const resultado = await this.galeriaRepository.delete(id);
    return (resultado.affected ?? 0) > 0;
  }
}
