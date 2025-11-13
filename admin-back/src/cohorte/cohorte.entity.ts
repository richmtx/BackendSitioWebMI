import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cohorte')
export class Cohorte {
  @PrimaryGeneratedColumn()
  id_cohorte: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen: string;
}
