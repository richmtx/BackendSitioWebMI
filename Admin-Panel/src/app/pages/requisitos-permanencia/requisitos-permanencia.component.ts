import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RequisitosPermanenciaService, RequisitoPermanencia } from './requisitos-permanencia.service';

@Component({
  selector: 'app-requisitos-permanencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requisitos-permanencia.component.html',
  styleUrls: ['./requisitos-permanencia.component.css']
})
export class RequisitosPermanenciaComponent implements OnInit {
  requisitosList: RequisitoPermanencia[] = [];

  nuevoRequisitoActivo = false;
  nuevoRequisito = '';
  editandoId: number | null = null;
  editDescripcion = '';

  constructor(private requisitosService: RequisitosPermanenciaService) { }

  ngOnInit(): void {
    this.cargarRequisitos();
  }

  cargarRequisitos(): void {
    this.requisitosService.getAll().subscribe({
      next: (data) => {
        this.requisitosList = data;
      },
      error: (error) => {
        console.error('Error al obtener los requisitos:', error);
      }
    });
  }

  mostrarInputNuevo(): void {
    this.nuevoRequisitoActivo = true;
  }

  cancelarNuevo(): void {
    this.nuevoRequisitoActivo = false;
    this.nuevoRequisito = '';
  }

  guardarNuevo(): void {
    const descripcion = this.nuevoRequisito.trim();

    if (!descripcion) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Por favor escribe un requisito'
      });
      return;
    }

    this.requisitosService.crearRequisito(descripcion).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Requisito guardado!',
          text: 'El nuevo requisito se ha agregado correctamente',
        }).then(() => {
          this.nuevoRequisitoActivo = false;
          this.nuevoRequisito = '';
          this.cargarRequisitos();
        });
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar el requisito'
        });
      }
    });
  }

  requisitoPermanenciaOriginal: RequisitoPermanencia | null = null;

  editarRequisito(requisito: RequisitoPermanencia): void {
    this.editandoId = requisito.id_requisito;
    this.requisitoPermanenciaOriginal = { ...requisito };
    this.editDescripcion = requisito.descripcion;
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.editDescripcion = '';
    this.requisitoPermanenciaOriginal = null;
  }

  guardarEdicion(requisito: RequisitoPermanencia): void {
    const nuevoTexto = this.editDescripcion.trim();

    if (!nuevoTexto) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'El requisito no puede estar vacío'
      });
      return;
    }

    if (!this.requisitoPermanenciaOriginal) {
      console.error("No hay datos originales para comparar.");
      return;
    }

    const sinCambios = nuevoTexto === this.requisitoPermanenciaOriginal.descripcion;

    if (sinCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones en este requisito de permanencia.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.requisitosService.actualizarRequisito(requisito.id_requisito, nuevoTexto).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Requisito actualizado!',
          text: 'El requisito se ha modificado correctamente',
        }).then(() => {
          this.cancelarEdicion();
          this.cargarRequisitos();
        });
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar el requisito'
        });
      }
    });
  }


  eliminarRequisito(requisito: RequisitoPermanencia): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este requisito se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.requisitosService.eliminarRequisito(requisito.id_requisito).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'El requisito se ha eliminado correctamente',
            }).then(() => {
              this.cargarRequisitos();
            });
          },
          error: (err) => {
            console.error('Error al eliminar el requisito:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al eliminar el requisito'
            });
          }
        });
      }
    });
  }
}
