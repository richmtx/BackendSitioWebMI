import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrientacionProfesionalService, OrientacionProfesional } from './orientacion-profesional.service';
import { DistribucionAsignaturasService, DistribucionAsignatura } from './distribucion-asignaturas.service';
import { AsignaturasBasicasService, AsignaturaBasica } from './asignaturas-basicas.service';
import { AsignaturasOptativasService, AsignaturaOptativa } from './asignaturas-optativas.service';
import { MapaCurricularService } from './mapa-curricular.service';

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

  mapa: any = null;
  editandoMapa = false;
  nuevaURLMapa = '';

  constructor(
    private orientacionService: OrientacionProfesionalService,
    private distribucionService: DistribucionAsignaturasService,
    private basicasService: AsignaturasBasicasService,
    private optativasService: AsignaturasOptativasService,
    private mapaCurricularService: MapaCurricularService
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

    this.mapaCurricularService.obtenerMapa().subscribe({
      next: data => {
        this.mapa = data;
        this.nuevaURLMapa = data?.url || '';
      },
      error: err => console.error('Error al cargar mapa curricular', err)
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
          confirmButtonText: 'Ok'
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
          confirmButtonText: 'Ok'
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

  // === POST - Asignaturas Básicas ===
  nuevaFilaActivaBasicas = false;
  nuevaMateriaBasica = '';
  nuevosCreditosBasica: number | null = null;

  anadirFilaBasicas(): void {
    this.nuevaFilaActivaBasicas = true;
  }

  cancelarNuevaFilaBasicas(): void {
    this.nuevaFilaActivaBasicas = false;
    this.nuevaMateriaBasica = '';
    this.nuevosCreditosBasica = null;
  }

  guardarNuevaFilaBasicas(): void {
    if (!this.nuevaMateriaBasica || !this.nuevosCreditosBasica) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    const nuevoDato = {
      materia: this.nuevaMateriaBasica,
      creditos: this.nuevosCreditosBasica
    };

    this.basicasService.create(nuevoDato).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado correctamente',
          text: 'La nueva asignatura básica fue agregada.',
          confirmButtonText: 'Ok'
        });
        this.nuevaFilaActivaBasicas = false;
        this.nuevaMateriaBasica = '';
        this.nuevosCreditosBasica = null;
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

  // === POST - Asignaturas Optativas ===
  nuevaFilaActivaOptativas = false;
  nuevaMateriaOptativa = '';
  nuevosCreditosOptativa: number | null = null;

  anadirFilaOptativas(): void {
    this.nuevaFilaActivaOptativas = true;
  }

  cancelarNuevaFilaOptativas(): void {
    this.nuevaFilaActivaOptativas = false;
    this.nuevaMateriaOptativa = '';
    this.nuevosCreditosOptativa = null;
  }

  guardarNuevaFilaOptativas(): void {
    if (!this.nuevaMateriaOptativa || !this.nuevosCreditosOptativa) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    const nuevoDato = {
      materia: this.nuevaMateriaOptativa,
      creditos: this.nuevosCreditosOptativa
    };

    this.optativasService.create(nuevoDato).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Guardado correctamente',
          text: 'La nueva asignatura optativa fue agregada.',
          confirmButtonText: 'Ok'
        });
        this.nuevaFilaActivaOptativas = false;
        this.nuevaMateriaOptativa = '';
        this.nuevosCreditosOptativa = null;
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
  orientacionOriginal: OrientacionProfesional | null = null;
  filaEditando: number | null = null;
  editMateria = '';
  editCreditos: number | null = null;

  editarFila(item: OrientacionProfesional): void {
    this.filaEditando = item.id_orientacion;
    this.orientacionOriginal = { ...item };

    this.editMateria = item.materia;
    this.editCreditos = item.creditos;
  }

  cancelarEdicion(): void {
    this.filaEditando = null;
    this.editMateria = '';
    this.editCreditos = null;
    this.orientacionOriginal = null;
  }

  guardarEdicion(id_orientacion: number): void {
    if (!this.editMateria || this.editCreditos === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    if (!this.orientacionOriginal) {
      console.error('No hay datos originales para comparar.');
      return;
    }

    const datosActualizados = {
      materia: this.editMateria,
      creditos: this.editCreditos
    };

    const sinCambios =
      datosActualizados.materia === this.orientacionOriginal.materia &&
      datosActualizados.creditos === this.orientacionOriginal.creditos;

    if (sinCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones a este registro.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.orientacionService.update(id_orientacion, datosActualizados).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: 'Los datos se han guardado exitosamente.',
          confirmButtonText: 'Ok'
        });

        this.filaEditando = null;
        this.orientacionOriginal = null;
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
  distribucionOriginal: DistribucionAsignatura | null = null;
  filaEditandoDistribucion: number | null = null;
  editMateriaDistribucion = '';
  editCreditosDistribucion: number | null = null;

  editarFilaDistribucion(item: DistribucionAsignatura): void {
    this.filaEditandoDistribucion = item.id_asignatura;
    this.distribucionOriginal = { ...item };
    this.editMateriaDistribucion = item.materia;
    this.editCreditosDistribucion = item.creditos;
  }

  cancelarEdicionDistribucion(): void {
    this.filaEditandoDistribucion = null;
    this.editMateriaDistribucion = '';
    this.editCreditosDistribucion = null;
    this.distribucionOriginal = null;
  }

  guardarEdicionDistribucion(id_asignatura: number): void {
    if (!this.editMateriaDistribucion || this.editCreditosDistribucion === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    if (!this.distribucionOriginal) {
      console.error("No hay datos originales para comparar.");
      return;
    }

    const datosActualizados = {
      materia: this.editMateriaDistribucion,
      creditos: this.editCreditosDistribucion
    };

    const sinCambios =
      datosActualizados.materia === this.distribucionOriginal.materia &&
      datosActualizados.creditos === this.distribucionOriginal.creditos;

    if (sinCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones en esta asignatura.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.distribucionService.update(id_asignatura, datosActualizados).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: 'La asignatura fue actualizada exitosamente.',
          confirmButtonText: 'Ok'
        });

        this.filaEditandoDistribucion = null;
        this.distribucionOriginal = null;
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


  // === PUT - Asignaturas Básicas ===
  basicaOriginal: AsignaturaBasica | null = null;
  filaEditandoBasicas: number | null = null;
  editMateriaBasicas = '';
  editCreditosBasicas: number | null = null;

  editarFilaBasicas(item: AsignaturaBasica): void {
    this.filaEditandoBasicas = item.id_asignatura;
    this.basicaOriginal = { ...item };

    this.editMateriaBasicas = item.materia;
    this.editCreditosBasicas = item.creditos;
  }

  cancelarEdicionBasicas(): void {
    this.filaEditandoBasicas = null;
    this.editMateriaBasicas = '';
    this.editCreditosBasicas = null;
    this.basicaOriginal = null;
  }

  guardarEdicionBasicas(id_asignatura: number): void {
    if (!this.editMateriaBasicas || this.editCreditosBasicas === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    if (!this.basicaOriginal) {
      console.error("No hay datos originales para comparar.");
      return;
    }

    const datosActualizados = {
      materia: this.editMateriaBasicas,
      creditos: this.editCreditosBasicas
    };

    const sinCambios =
      datosActualizados.materia === this.basicaOriginal.materia &&
      datosActualizados.creditos === this.basicaOriginal.creditos;

    if (sinCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones a esta asignatura básica.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.basicasService.update(id_asignatura, datosActualizados).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: 'La asignatura básica fue actualizada exitosamente.',
          confirmButtonText: 'Ok'
        });

        this.filaEditandoBasicas = null;
        this.basicaOriginal = null;
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


  // === PUT - Asignaturas Optativas ===
  optativaOriginal: AsignaturaOptativa | null = null;
  filaEditandoOptativas: number | null = null;
  editMateriaOptativas = '';
  editCreditosOptativas: number | null = null;

  editarFilaOptativas(item: AsignaturaOptativa): void {
    this.filaEditandoOptativas = item.id_optativas;
    this.optativaOriginal = { ...item };

    this.editMateriaOptativas = item.materia;
    this.editCreditosOptativas = item.creditos;
  }

  cancelarEdicionOptativas(): void {
    this.filaEditandoOptativas = null;
    this.editMateriaOptativas = '';
    this.editCreditosOptativas = null;
    this.optativaOriginal = null;
  }

  guardarEdicionOptativas(id_optativas: number): void {
    if (!this.editMateriaOptativas || this.editCreditosOptativas === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.'
      });
      return;
    }

    if (!this.optativaOriginal) {
      console.error("No hay datos originales para comparar.");
      return;
    }

    const datosActualizados = {
      materia: this.editMateriaOptativas,
      creditos: this.editCreditosOptativas
    };

    const sinCambios =
      datosActualizados.materia === this.optativaOriginal.materia &&
      datosActualizados.creditos === this.optativaOriginal.creditos;

    if (sinCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones a esta asignatura optativa.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.optativasService.update(id_optativas, datosActualizados).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: 'La asignatura optativa fue actualizada exitosamente.',
          confirmButtonText: 'Ok'
        });

        this.filaEditandoOptativas = null;
        this.optativaOriginal = null;
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

  // === DELETE - Asignaturas Básicas ===
  eliminarFilaBasicas(id_asignatura: number): void {
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
        this.basicasService.delete(id_asignatura).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado correctamente',
              text: 'La asignatura básica fue eliminada.',
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

  // === DELETE - Asignaturas Optativas ===
  eliminarFilaOptativas(id_optativas: number): void {
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
        this.optativasService.delete(id_optativas).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado correctamente',
              text: 'La asignatura optativa fue eliminada.',
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

  // Mapa Curricular
  editarMapa(): void {
    this.editandoMapa = true;
  }

  cancelarEdicionMapa(): void {
    this.editandoMapa = false;
    this.nuevaURLMapa = this.mapa?.url || '';
  }

  guardarEdicionMapa(): void {

    if (!this.nuevaURLMapa) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Por favor ingresa una URL.'
      });
      return;
    }

    if (this.nuevaURLMapa === this.mapa.url) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones a la URL.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.mapaCurricularService.actualizarMapa(1, this.nuevaURLMapa).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Mapa curricular actualizado',
          text: 'La URL fue modificada exitosamente.'
        });

        this.mapa = res;
        this.editandoMapa = false;
      },
      error: err => {
        console.error('Error al actualizar mapa:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la URL.'
        });
      }
    });
  }
}
