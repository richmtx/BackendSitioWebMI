import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NucleoBasico } from './nucleoBasico.entity';
import { CvuEnlace } from './cvuEnlace.entity';

@Injectable()
export class NucleoBasicoService {
  constructor(
    @InjectRepository(NucleoBasico)
    private readonly nucleoRepository: Repository<NucleoBasico>,

    @InjectRepository(CvuEnlace)
    private readonly cvuRepository: Repository<CvuEnlace>,
  ) {}

  async obtenerTodos() {
    return await this.nucleoRepository.find({
      relations: ['cvu_enlaces'],
      order: { id: 'ASC' },
    });
  }

  // ===========================
  // CREATE
  // ===========================
  async crearRegistro(datos: NucleoBasico) {
    const { cvu_enlaces, ...nucleoData } = datos;

    const nuevo = this.nucleoRepository.create(nucleoData);
    const guardado = await this.nucleoRepository.save(nuevo);

    if (cvu_enlaces && cvu_enlaces.length > 0) {
      const enlaces = cvu_enlaces.map((enlace) =>
        this.cvuRepository.create({
          enlace: enlace.enlace,
          nucleo: guardado,
        }),
      );
      await this.cvuRepository.save(enlaces);
    }

    return await this.nucleoRepository.findOne({
      where: { id: guardado.id },
      relations: ['cvu_enlaces'],
    });
  }

  // ===========================
  // UPDATE
  // ===========================
  async actualizarRegistro(id: number, datos: NucleoBasico) {
    const existente = await this.nucleoRepository.findOne({
      where: { id },
      relations: ['cvu_enlaces'],
    });

    if (!existente) {
      throw new NotFoundException(`No se encontró el registro con id ${id}`);
    }

    const { cvu_enlaces, ...nucleoData } = datos;

    await this.nucleoRepository.update(id, nucleoData);

    if (cvu_enlaces) {
      await this.cvuRepository.delete({ nucleo: { id } });

      const nuevos = cvu_enlaces.map((enlace) =>
        this.cvuRepository.create({
          enlace: enlace.enlace,
          nucleo: { id },
        }),
      );

      await this.cvuRepository.save(nuevos);
    }

    return await this.nucleoRepository.findOne({
      where: { id },
      relations: ['cvu_enlaces'],
    });
  }

  // ===========================
  // DELETE
  // ===========================
  async delete(id: number) {
    const resultado = await this.nucleoRepository.delete(id);

    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró el registro con id ${id}`);
    }

    return { mensaje: 'Registro eliminado correctamente' };
  }
}
