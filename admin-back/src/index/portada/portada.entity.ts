import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('portada')
export class Portada {
  @PrimaryGeneratedColumn()
  id_portada: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ length: 255, nullable: true })
  imagen: string;
}
