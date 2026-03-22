import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Egresados } from './egresados.entity';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EgresadosService {
  constructor(
    @InjectRepository(Egresados)
    private readonly egresadosRepository: Repository<Egresados>,
  ) { }

  async findAll(): Promise<any[]> {
    const egresados = await this.egresadosRepository.find();

    return egresados.map((egresado) => {
      if (egresado.imagen) {
        const imagePath = path.join(process.cwd(), egresado.imagen);

        if (fs.existsSync(imagePath)) {
          const file = fs.readFileSync(imagePath);
          const base64 = file.toString('base64');

          egresado.imagen = `data:image/jpeg;base64,${base64}`;
        }
      }

      return egresado;
    });
  }

  async findOne(id: number): Promise<any> {
    const egresado = await this.egresadosRepository.findOneBy({
      id_egresados: id,
    });

    if (!egresado) {
      throw new NotFoundException(`Egresado con ID ${id} no encontrado`);
    }

    if (egresado.imagen) {
      const imagePath = path.join(process.cwd(), egresado.imagen);

      if (fs.existsSync(imagePath)) {
        const file = fs.readFileSync(imagePath);
        const base64 = file.toString('base64');

        egresado.imagen = `data:image/jpeg;base64,${base64}`;
      }
    }

    return egresado;
  }

  async update(id: number, updatedData: Partial<Egresados>): Promise<Egresados> {
    const egresado = await this.egresadosRepository.findOneBy({
      id_egresados: id,
    });

    if (!egresado) {
      throw new NotFoundException(`Egresado con ID ${id} no encontrado`);
    }

    Object.assign(egresado, updatedData);

    return this.egresadosRepository.save(egresado);
  }
}
