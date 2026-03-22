import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portada } from './portada.entity';

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PortadaService {
  constructor(
    @InjectRepository(Portada)
    private readonly portadaRepository: Repository<Portada>,
  ) { }

  async findAll(): Promise<any[]> {
    const portadas = await this.portadaRepository.find();

    return portadas.map((portada) => {
      let imagenBase64: string | null = null;

      if (portada.imagen) {
        const imagePath = join(process.cwd(), portada.imagen);

        if (existsSync(imagePath)) {
          const file = readFileSync(imagePath);
          const base64 = file.toString('base64');
          const ext = portada.imagen.split('.').pop();

          imagenBase64 = `data:image/${ext};base64,${base64}`;
        }
      }

      return {
        ...portada,
        imagen: imagenBase64,
      };
    });
  }

  async update(id: number, portadaData: Partial<Portada>): Promise<Portada> {
    const portada = await this.portadaRepository.findOne({
      where: { id_portada: id },
    });

    if (!portada) {
      throw new HttpException('Portada no encontrada', HttpStatus.NOT_FOUND);
    }

    Object.assign(portada, portadaData);

    const portadaActualizada = await this.portadaRepository.save(portada);

    return portadaActualizada;
  }
}
