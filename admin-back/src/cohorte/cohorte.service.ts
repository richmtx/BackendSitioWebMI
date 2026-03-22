import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cohorte } from './cohorte.entity';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CohorteService {
  constructor(
    @InjectRepository(Cohorte)
    private readonly cohorteRepository: Repository<Cohorte>,
  ) { }

  async findAll(): Promise<any[]> {
    const cohortes = await this.cohorteRepository.find();

    return cohortes.map((cohorte) => {
      if (cohorte.imagen) {
        const imagePath = path.join(process.cwd(), 'uploads', cohorte.imagen);

        if (fs.existsSync(imagePath)) {
          const file = fs.readFileSync(imagePath);
          const base64 = file.toString('base64');

          const ext = path.extname(imagePath).toLowerCase();

          let mimeType = 'image/jpeg';
          if (ext === '.png') mimeType = 'image/png';
          if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
          if (ext === '.webp') mimeType = 'image/webp';

          cohorte.imagen = `data:${mimeType};base64,${base64}`;
        }
      }

      return cohorte;
    });
  }

  async findOne(id: number): Promise<any> {
    const cohorte = await this.cohorteRepository.findOneBy({
      id_cohorte: id,
    });

    if (!cohorte) {
      throw new Error(`No se encontró la cohorte con id ${id}`);
    }

    if (cohorte.imagen) {
      const imagePath = path.join(process.cwd(), 'uploads', cohorte.imagen);

      if (fs.existsSync(imagePath)) {
        const file = fs.readFileSync(imagePath);
        const base64 = file.toString('base64');

        const ext = path.extname(imagePath).toLowerCase();

        let mimeType = 'image/jpeg';
        if (ext === '.png') mimeType = 'image/png';
        if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
        if (ext === '.webp') mimeType = 'image/webp';

        cohorte.imagen = `data:${mimeType};base64,${base64}`;
      }
    }

    return cohorte;
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
