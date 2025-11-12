import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('galeria')
export class Galeria {
  @PrimaryGeneratedColumn()
  id_galeria: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen: string | null;
}
