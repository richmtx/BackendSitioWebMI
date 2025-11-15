import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('carrusel')
export class Carrusel {
  @PrimaryGeneratedColumn()
  id_carrusel: number;

  @Column({ type: 'varchar', length: 255 })
  imagen: string;
}
