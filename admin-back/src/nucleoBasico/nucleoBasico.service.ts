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
  ) { }

  async obtenerTodos() {
    return await this.nucleoRepository.find({
      relations: ['cvu_enlaces'],
      order: { id: 'ASC' },
    });
  }

  async crearRegistro(datos: NucleoBasico) {
    const { cvu_enlaces, ...nucleoData } = datos;
    const nuevoNucleo = this.nucleoRepository.create(nucleoData);
    const nucleoGuardado = await this.nucleoRepository.save(nuevoNucleo);

    if (cvu_enlaces && cvu_enlaces.length > 0) {
      const enlacesConRelacion = cvu_enlaces.map((enlace) =>
        this.cvuRepository.create({
          enlace: enlace.enlace,
          nucleo: nucleoGuardado,
        }),
      );
      await this.cvuRepository.save(enlacesConRelacion);
    }

    return await this.nucleoRepository.findOne({
      where: { id: nucleoGuardado.id },
      relations: ['cvu_enlaces'],
    });
  }

  async actualizarRegistro(id: number, datos: NucleoBasico) {
    const nucleoExistente = await this.nucleoRepository.findOne({
      where: { id },
      relations: ['cvu_enlaces'],
    });

    if (!nucleoExistente) {
      throw new NotFoundException(`No se encontró el registro con id ${id}`);
    }

    const { cvu_enlaces, ...nucleoData } = datos;

    await this.nucleoRepository.update(id, nucleoData);

    if (cvu_enlaces) {
      await this.cvuRepository.delete({ nucleo: { id } });

      const nuevosEnlaces = cvu_enlaces.map((enlace) =>
        this.cvuRepository.create({
          enlace: enlace.enlace,
          nucleo: { id },
        }),
      );
      await this.cvuRepository.save(nuevosEnlaces);
    }

    return await this.nucleoRepository.findOne({
      where: { id },
      relations: ['cvu_enlaces'],
    });
  }

  async delete(id: number) {
    const resultado = await this.nucleoRepository.delete(id);

    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró el registro con id ${id}`);
    }

    return { mensaje: 'Registro eliminado correctamente' };
  }
}
