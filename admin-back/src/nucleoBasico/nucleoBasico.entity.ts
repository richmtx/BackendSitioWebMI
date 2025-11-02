import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CvuEnlace } from './cvuEnlace.entity';

@Entity('nucleo_basico')
export class NucleoBasico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 100, nullable: true })
  cargo: string;

  @Column({ length: 50, nullable: true })
  cedula_profesional: string;

  @Column({ length: 150, nullable: true }) // 👈 aquí quitamos unique
  correo: string;

  @Column({ length: 150, nullable: true })
  especialidad: string;

  @Column({ length: 100, nullable: true })
  grado_maximo: string;

  @Column({ type: 'text', nullable: true })
  lineas_investigacion: string;

  @Column({ length: 50, nullable: true })
  nivel_snii: string;

  @Column({ type: 'text', nullable: true })
  semblanza: string;

  @Column({ length: 150, nullable: true })
  unidad_adscripcion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @OneToMany(() => CvuEnlace, (cvu) => cvu.nucleo, { cascade: true })
  cvu_enlaces: CvuEnlace[];
}
