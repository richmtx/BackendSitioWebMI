import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RequisitosGradoService, RequisitoGrado } from './requisitos-grado.service';

@Component({
  selector: 'app-requisitos-grado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requisitos-grado.component.html',
  styleUrls: ['./requisitos-grado.component.css']
})
export class RequisitosGradoComponent implements OnInit {
  requisitos: RequisitoGrado[] = [];
  nuevoRequisitoVisible = false;
  nuevoRequisito = '';
  editandoId: number | null = null;
  editDescripcion = '';
  errorMsg = '';

  constructor(private requisitosService: RequisitosGradoService) { }

  ngOnInit(): void {
    this.cargarRequisitos();
  }

  cargarRequisitos(): void {
    this.requisitosService.getAll().subscribe({
      next: (data) => (this.requisitos = data),
      error: (err) => {
        console.error('Error al obtener los datos:', err);
        this.errorMsg = 'Error al obtener los requisitos.';
      }
    });
  }

  mostrarInput(): void {
    this.nuevoRequisitoVisible = true;
  }

  cancelarNuevo(): void {
    this.nuevoRequisitoVisible = false;
    this.nuevoRequisito = '';
  }

  guardarNuevo(): void {
    const texto = this.nuevoRequisito.trim();

    if (!texto) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Por favor escribe un requisito'
      });
      return;
    }

    this.requisitosService.create({ descripcion: texto }).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: '¡Requisito guardado!',
          text: 'El nuevo requisito se ha agregado correctamente'
        }).then(() => {
          this.requisitos.push(data);
          this.cancelarNuevo();
        });
      },
      error: (err) => {
        console.error('Error al guardar el requisito:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar el requisito'
        });
      }
    });
  }

  requisitoGradoOriginal: RequisitoGrado | null = null;

  editarRequisito(req: RequisitoGrado): void {
    this.editandoId = req.id_grado;
    this.requisitoGradoOriginal = { ...req };
    this.editDescripcion = req.descripcion;
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.editDescripcion = '';
    this.requisitoGradoOriginal = null;
  }

  guardarEdicion(req: RequisitoGrado): void {
    const nuevoTexto = this.editDescripcion.trim();

    if (!nuevoTexto) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'El requisito no puede estar vacío'
      });
      return;
    }

    if (!this.requisitoGradoOriginal) {
      console.error("No hay datos originales para comparar.");
      return;
    }

    const sinCambios = nuevoTexto === this.requisitoGradoOriginal.descripcion;

    if (sinCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones en este requisito de grado.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.requisitosService.update(req.id_grado, { descripcion: nuevoTexto }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Requisito actualizado!',
          text: 'El requisito se ha modificado correctamente'
        }).then(() => {
          const index = this.requisitos.findIndex(r => r.id_grado === req.id_grado);
          if (index !== -1) {
            this.requisitos[index].descripcion = nuevoTexto;
          }

          this.cancelarEdicion();
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


  eliminarRequisito(req: RequisitoGrado): void {
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
        this.requisitosService.delete(req.id_grado).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Eliminado!',
              text: 'El requisito se ha eliminado correctamente',
              confirmButtonText: 'Ok'
            }).then(() => {
              this.requisitos = this.requisitos.filter(r => r.id_grado !== req.id_grado);
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
