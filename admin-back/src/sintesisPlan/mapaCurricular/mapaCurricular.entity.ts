import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mapa_curricular')
export class MapaCurricular {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  url: string;
}
