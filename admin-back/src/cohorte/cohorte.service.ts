import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cohorte } from './cohorte.entity';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class CohorteService {
  constructor(
    @InjectRepository(Cohorte)
    private readonly cohorteRepository: Repository<Cohorte>,
  ) {}

  findAll(): Promise<Cohorte[]> {
    return this.cohorteRepository.find();
  }

  findOne(id: number): Promise<Cohorte | null> {
    return this.cohorteRepository.findOneBy({ id_cohorte: id });
  }

  async create(cohorteData: Partial<Cohorte>): Promise<Cohorte> {
    const cohorte = this.cohorteRepository.create(cohorteData);
    return this.cohorteRepository.save(cohorte);
  }

  async update(id: number, cohorteData: Partial<Cohorte>): Promise<Cohorte> {
    const cohorte = await this.cohorteRepository.findOneBy({ id_cohorte: id });

    if (!cohorte) {
      throw new Error(`No se encontró la cohorte con id ${id}`);
    }

    Object.assign(cohorte, cohorteData);
    return this.cohorteRepository.save(cohorte);
  }

  async remove(id: number): Promise<void> {
    const cohorte = await this.cohorteRepository.findOneBy({ id_cohorte: id });

    if (!cohorte) {
      throw new Error(`No se encontró la cohorte con id ${id}`);
    }

    if (cohorte.imagen) {
      const filePath = join(__dirname, '..', '..', 'uploads', cohorte.imagen);
      if (existsSync(filePath)) {
        unlinkSync(filePath);
      }
    }

    await this.cohorteRepository.remove(cohorte);
  }
}
