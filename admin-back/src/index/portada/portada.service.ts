import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portada } from './portada.entity';

@Injectable()
export class PortadaService {
  constructor(
    @InjectRepository(Portada)
    private readonly portadaRepository: Repository<Portada>,
  ) {}

  async findAll(): Promise<Portada[]> {
    return await this.portadaRepository.find();
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
