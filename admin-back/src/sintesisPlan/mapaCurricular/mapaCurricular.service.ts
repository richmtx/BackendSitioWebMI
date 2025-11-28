import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapaCurricular } from './mapaCurricular.entity';

@Injectable()
export class MapaCurricularService {
    constructor(
        @InjectRepository(MapaCurricular)
        private readonly mapaRepository: Repository<MapaCurricular>,
    ) { }

    async find(): Promise<MapaCurricular | null> {
        return await this.mapaRepository.findOne({ where: { id: 1 } });
    }

    async update(id: number, url: string): Promise<MapaCurricular> {
        let registro = await this.mapaRepository.findOne({ where: { id } });

        if (!registro) {
            registro = this.mapaRepository.create({ id, url });
        } else {
            registro.url = url;
        }

        return await this.mapaRepository.save(registro);
    }
}
