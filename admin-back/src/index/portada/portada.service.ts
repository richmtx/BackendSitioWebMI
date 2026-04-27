import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portada } from './portada.entity';
import { imagenABase64 } from '../../utils/imagen.helper';

@Injectable()
export class PortadaService {
  constructor(
    @InjectRepository(Portada)
    private readonly portadaRepository: Repository<Portada>,
  ) { }

  async findAll(): Promise<any[]> {
    const portadas = await this.portadaRepository.find();
    return portadas.map((portada) => ({
      ...portada,
      imagen: imagenABase64(portada.imagen),
    }));
  }

  async update(id: number, portadaData: Partial<Portada>): Promise<Portada> {
    const portada = await this.portadaRepository.findOne({
      where: { id_portada: id },
    });

    if (!portada) {
      throw new HttpException('Portada no encontrada', HttpStatus.NOT_FOUND);
    }

    Object.assign(portada, portadaData);

    return this.portadaRepository.save(portada);
  }
}