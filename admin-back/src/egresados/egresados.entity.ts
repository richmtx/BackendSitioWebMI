import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'egresados' })
export class Egresados {
  @PrimaryGeneratedColumn()
  id_egresados: number;

  @Column('text')
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen: string;
}
