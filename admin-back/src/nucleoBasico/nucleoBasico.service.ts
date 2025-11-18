import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
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

  async crearRegistro(datos: any) {
    let enlacesArray: any[] = [];

    if (typeof datos.cvu_enlaces === 'string') {
      try {
        enlacesArray = JSON.parse(datos.cvu_enlaces);
      } catch (error) {
        console.error('Error al parsear cvu_enlaces:', error);
      }
    }

    const { cvu_enlaces, ...soloNucleo } = datos;
    const soloNucleoTyped: DeepPartial<NucleoBasico> = soloNucleo;

    const nuevo = this.nucleoRepository.create(soloNucleoTyped);
    const guardado = (await this.nucleoRepository.save(nuevo)) as NucleoBasico;

    if (Array.isArray(enlacesArray) && enlacesArray.length > 0) {
      const enlaces = enlacesArray.map((e) =>
        this.cvuRepository.create({
          enlace: e.enlace,
          nucleo: { id: guardado.id },
        }),
      );

      await this.cvuRepository.save(enlaces);
    }

    return await this.nucleoRepository.findOne({
      where: { id: guardado.id },
      relations: ['cvu_enlaces'],
    });
  }

  async actualizarRegistro(id: number, datos: any) {
    const existente = await this.nucleoRepository.findOne({
      where: { id },
      relations: ['cvu_enlaces'],
    });

    if (!existente) {
      throw new NotFoundException(`No se encontró el registro con id ${id}`);
    }

    let enlacesArray: any[] = [];

    if (typeof datos.cvu_enlaces === 'string') {
      try {
        enlacesArray = JSON.parse(datos.cvu_enlaces);
      } catch (error) {
        console.error('Error al parsear cvu_enlaces:', error);
      }
    }

    const { cvu_enlaces, ...soloNucleo } = datos;

    await this.nucleoRepository.update(id, soloNucleo as DeepPartial<NucleoBasico>);

    await this.cvuRepository.delete({ nucleo: { id } });

    if (Array.isArray(enlacesArray) && enlacesArray.length > 0) {
      const nuevos = enlacesArray.map((e) =>
        this.cvuRepository.create({
          enlace: e.enlace,
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

  async delete(id: number) {
    const resultado = await this.nucleoRepository.delete(id);

    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró el registro con id ${id}`);
    }

    return { mensaje: 'Registro eliminado correctamente' };
  }
}
