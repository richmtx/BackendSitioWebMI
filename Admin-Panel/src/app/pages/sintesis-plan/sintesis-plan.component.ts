import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrientacionProfesionalService, OrientacionProfesional } from './orientacion-profesional.service';
import { DistribucionAsignaturasService, DistribucionAsignatura } from './distribucion-asignaturas.service';
import { AsignaturasBasicasService, AsignaturaBasica } from './asignaturas-basicas.service';
import { AsignaturasOptativasService, AsignaturaOptativa } from './asignaturas-optativas.service';

@Component({
  selector: 'app-sintesis-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sintesis-plan.component.html',
  styleUrls: ['./sintesis-plan.component.css']
})
export class SintesisPlanComponent implements OnInit {
  orientacion: OrientacionProfesional[] = [];
  distribucion: DistribucionAsignatura[] = [];
  basicas: AsignaturaBasica[] = [];
  optativas: AsignaturaOptativa[] = [];

  nuevaFilaActiva = false;
  nuevaMateria = '';
  nuevosCreditos: number | null = null;

  constructor(
    private orientacionService: OrientacionProfesionalService,
    private distribucionService: DistribucionAsignaturasService,
    private basicasService: AsignaturasBasicasService,
    private optativasService: AsignaturasOptativasService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.orientacionService.getAll().subscribe({
      next: data => this.orientacion = data,
      error: err => console.error('Error al cargar orientaciones', err)
    });

    this.distribucionService.getAll().subscribe({
      next: data => this.distribucion = data,
      error: err => console.error('Error al cargar distribución', err)
    });

    this.basicasService.getAll().subscribe({
      next: data => this.basicas = data,
      error: err => console.error('Error al cargar básicas', err)
    });

    this.optativasService.getAll().subscribe({
      next: data => this.optativas = data,
      error: err => console.error('Error al cargar optativas', err)
    });
  }

  // === POST ===
  anadirFila(): void {
    this.nuevaFilaActiva = true;
  }

  cancelarNuevaFila(): void {
    this.nuevaFilaActiva = false;
    this.nuevaMateria = '';
    this.nuevosCreditos = null;
  }

  guardarNuevaFila(): void {
    if (!this.nuevaMateria || !this.nuevosCreditos) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.'
      });
      return;
    }

    const nuevoDato = {
      materia: this.nuevaMateria,
      creditos: this.nuevosCreditos
    };

    this.orientacionService.create(nuevoDato).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado correctamente',
          text: 'La nueva materia fue agregada.',
          confirmButtonText: 'Aceptar'
        });
        this.nuevaFilaActiva = false;
        this.nuevaMateria = '';
        this.nuevosCreditos = null;
        this.cargarDatos();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar los datos.'
        });
      }
    });
  }

  // === POST - Distribución de Asignaturas ===
  nuevaFilaActivaDistribucion = false;
  nuevaMateriaDistribucion = '';
  nuevosCreditosDistribucion: number | null = null;

  anadirFilaDistribucion(): void {
    this.nuevaFilaActivaDistribucion = true;
  }

  cancelarNuevaFilaDistribucion(): void {
    this.nuevaFilaActivaDistribucion = false;
    this.nuevaMateriaDistribucion = '';
    this.nuevosCreditosDistribucion = null;
  }

  guardarNuevaFilaDistribucion(): void {
    if (!this.nuevaMateriaDistribucion || !this.nuevosCreditosDistribucion) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    const nuevoDato = {
      materia: this.nuevaMateriaDistribucion,
      creditos: this.nuevosCreditosDistribucion
    };

    this.distribucionService.create(nuevoDato).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado correctamente',
          text: 'La nueva asignatura fue agregada.',
          confirmButtonText: 'Aceptar'
        });
        this.nuevaFilaActivaDistribucion = false;
        this.nuevaMateriaDistribucion = '';
        this.nuevosCreditosDistribucion = null;
        this.cargarDatos(); 
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar los datos.'
        });
      }
    });
  }

  // === PUT (editar) ===
  filaEditando: number | null = null;
  editMateria = '';
  editCreditos: number | null = null;

  editarFila(item: OrientacionProfesional): void {
    this.filaEditando = item.id_orientacion;
    this.editMateria = item.materia;
    this.editCreditos = item.creditos;
  }

  cancelarEdicion(): void {
    this.filaEditando = null;
    this.editMateria = '';
    this.editCreditos = null;
  }

  guardarEdicion(id_orientacion: number): void {
    if (!this.editMateria || !this.editCreditos) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    const datosActualizados = {
      materia: this.editMateria,
      creditos: this.editCreditos
    };

    this.orientacionService.update(id_orientacion, datosActualizados).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: 'Los datos se han guardado exitosamente.',
          confirmButtonText: 'Aceptar'
        });
        this.filaEditando = null;
        this.cargarDatos();
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar los datos.'
        });
      }
    });
  }

  // === PUT - Distribución de Asignaturas ===
  filaEditandoDistribucion: number | null = null;
  editMateriaDistribucion = '';
  editCreditosDistribucion: number | null = null;

  editarFilaDistribucion(item: DistribucionAsignatura): void {
    this.filaEditandoDistribucion = item.id_asignatura;
    this.editMateriaDistribucion = item.materia;
    this.editCreditosDistribucion = item.creditos;
  }

  cancelarEdicionDistribucion(): void {
    this.filaEditandoDistribucion = null;
    this.editMateriaDistribucion = '';
    this.editCreditosDistribucion = null;
  }

  guardarEdicionDistribucion(id_asignatura: number): void {
    if (!this.editMateriaDistribucion || !this.editCreditosDistribucion) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    const datosActualizados = {
      materia: this.editMateriaDistribucion,
      creditos: this.editCreditosDistribucion
    };

    this.distribucionService.update(id_asignatura, datosActualizados).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: 'La asignatura fue actualizada exitosamente.',
          confirmButtonText: 'Aceptar'
        });
        this.filaEditandoDistribucion = null;
        this.cargarDatos();
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar los datos.'
        });
      }
    });
  }

  // === DELETE ===
  eliminarFila(id_orientacion: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la materia de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orientacionService.delete(id_orientacion).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado correctamente',
              text: 'La materia fue eliminada con éxito.',
              timer: 1500,
              showConfirmButton: true
            });
            this.cargarDatos();
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al eliminar la materia.'
            });
          }
        });
      } else {
      }
    });
  }

  // === DELETE - Distribución de Asignaturas ===
  eliminarFilaDistribucion(id_asignatura: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la asignatura de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.distribucionService.delete(id_asignatura).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado correctamente',
              text: 'La asignatura fue eliminada con éxito.',
              timer: 1500,
              showConfirmButton: true
            });
            this.cargarDatos(); 
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al eliminar la asignatura.'
            });
          }
        });
      } else {
      }
    });
  }
}
