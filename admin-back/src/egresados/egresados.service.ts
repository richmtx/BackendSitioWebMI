import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Egresados } from './egresados.entity';
import { imagenABase64 } from './../utils/imagen.helper';

@Injectable()
export class EgresadosService {
  constructor(
    @InjectRepository(Egresados)
    private readonly egresadosRepository: Repository<Egresados>,
  ) { }

  async findAll(): Promise<any[]> {
    const egresados = await this.egresadosRepository.find();
    return egresados.map((egresado) => ({
      ...egresado,
      imagen: imagenABase64(egresado.imagen),
    }));
  }

  async findOne(id: number): Promise<any> {
    const egresado = await this.egresadosRepository.findOneBy({
      id_egresados: id,
    });

    if (!egresado) {
      throw new NotFoundException(`Egresado con ID ${id} no encontrado`);
    }

    return { ...egresado, imagen: imagenABase64(egresado.imagen) };
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