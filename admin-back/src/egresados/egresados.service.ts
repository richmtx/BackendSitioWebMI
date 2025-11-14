import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Egresados } from './egresados.entity';

@Injectable()
export class EgresadosService {
  constructor(
    @InjectRepository(Egresados)
    private readonly egresadosRepository: Repository<Egresados>,
  ) {}

  findAll(): Promise<Egresados[]> {
    return this.egresadosRepository.find();
  }

  async findOne(id: number): Promise<Egresados> {
    const egresado = await this.egresadosRepository.findOneBy({
      id_egresados: id,
    });

    if (!egresado) {
      throw new NotFoundException(`Egresado con ID ${id} no encontrado`);
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
