import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Galeria } from './galeria.entity';
import { imagenABase64 } from '../../utils/imagen.helper';

@Injectable()
export class GaleriaService {
  constructor(
    @InjectRepository(Galeria)
    private readonly galeriaRepository: Repository<Galeria>,
  ) { }

  async findAll(): Promise<any[]> {
    const galerias = await this.galeriaRepository.find();
    return galerias.map((item) => ({
      ...item,
      imagen: imagenABase64(item.imagen),
    }));
  }

  async findOne(id: number): Promise<any | null> {
    const item = await this.galeriaRepository.findOneBy({ id_galeria: id });
    if (!item) return null;
    return { ...item, imagen: imagenABase64(item.imagen) };
  }

  // POST
  create(data: Partial<Galeria>): Promise<Galeria> {
    const nuevaGaleria = this.galeriaRepository.create(data);
    return this.galeriaRepository.save(nuevaGaleria);
  }

  // PUT
  async update(id: number, data: Partial<Galeria>): Promise<Galeria | null> {
    const galeriaExistente = await this.galeriaRepository.findOneBy({ id_galeria: id });
    if (!galeriaExistente) return null;
    const galeriaActualizada = this.galeriaRepository.merge(galeriaExistente, data);
    return this.galeriaRepository.save(galeriaActualizada);
  }

  // DELETE
  async remove(id: number): Promise<boolean> {
    const resultado = await this.galeriaRepository.delete(id);
    return (resultado.affected ?? 0) > 0;
  }
}