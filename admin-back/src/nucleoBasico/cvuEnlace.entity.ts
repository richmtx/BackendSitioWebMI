import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NucleoBasico } from './nucleoBasico.entity';

@Entity('cvu_enlaces')
export class CvuEnlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  enlace: string;

  @ManyToOne(() => NucleoBasico, (nucleo) => nucleo.cvu_enlaces, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nucleo_id' })
  nucleo: NucleoBasico;
}
