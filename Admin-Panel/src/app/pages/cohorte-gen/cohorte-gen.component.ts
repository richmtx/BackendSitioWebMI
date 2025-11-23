import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CohorteGenService, Cohorte } from './cohorte-gen.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { URL_SERVER } from '../../config/server.config';

@Component({
  selector: 'app-cohorte-gen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cohorte-gen.component.html',
  styleUrls: ['./cohorte-gen.component.css']
})
export class CohorteGenComponent implements OnInit {

  cohorte: Cohorte[] = [];

  // Variable Global
  urlServer = URL_SERVER;

  mostrarFormulario = false;
  nuevoTitulo: string = '';
  nuevaImagen: File | null = null;

  previewUrl: string | ArrayBuffer | null = null;

  constructor(private cohorteService: CohorteGenService) { }

  ngOnInit(): void {
    this.cargarCohortes();
  }

  cargarCohortes(): void {
    this.cohorteService.getCohortes().subscribe({
      next: (data) => this.cohorte = data,
      error: (err) => console.error('Error:', err)
    });
  }

  onFileSelected(event: any) {
    this.nuevaImagen = event.target.files[0];

    if (this.nuevaImagen) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.nuevaImagen);
    }
  }

  guardarCohorte(): void {

    if (!this.nuevoTitulo) {
      Swal.fire({
        icon: 'warning',
        title: 'Título requerido',
        text: 'Debes ingresar un título.',
      });
      return;
    }

    const data = {
      titulo: this.nuevoTitulo,
      imagen: this.nuevaImagen
    };

    this.cohorteService.createCohorte(data).subscribe({
      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Registro agregado',
          text: 'Cohorte se agregó correctamente.',
        });

        this.cargarCohortes();
        this.cancelarFormulario();
      },
      error: (err) => {
        console.error('Error al crear cohorte:', err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar la cohorte.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.nuevoTitulo = '';
    this.nuevaImagen = null;
    this.previewUrl = null;
  }

  filaEditando: number | null = null;
  editTitulo: string = '';
  editImagen: File | null = null;
  previewUrlEditar: string | ArrayBuffer | null = null;
  tituloOriginal: string = '';
  imagenOriginal: string | null = null;

  abrirEdicion(item: Cohorte) {
    this.filaEditando = item.id_cohorte;

    this.editTitulo = item.titulo;
    this.editImagen = null;
    this.previewUrlEditar = null;

    this.tituloOriginal = item.titulo;
    this.imagenOriginal = item.imagen ?? null;
  }

  onFileSelectedEditar(event: any) {
    this.editImagen = event.target.files[0];

    if (this.editImagen) {
      const reader = new FileReader();
      reader.onload = () => this.previewUrlEditar = reader.result;
      reader.readAsDataURL(this.editImagen);
    }
  }

  guardarEdicion(id: number) {

    if (!this.editTitulo) {
      Swal.fire({
        icon: 'warning',
        title: 'Título requerido',
        text: 'Debes ingresar un título.',
      });
      return;
    }

    const noCambioTitulo = this.editTitulo === this.tituloOriginal;
    const noCambioImagen = this.editImagen === null;

    if (noCambioTitulo && noCambioImagen) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste ninguna modificación.',
      });
      return;
    }

    const data = {
      titulo: this.editTitulo,
      imagen: this.editImagen
    };

    this.cohorteService.updateCohorte(id, data).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Cohorte actualizada',
          text: 'Los cambios se guardaron correctamente.',
        });

        this.cargarCohortes();
        this.cancelarEdicion();
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la cohorte.',
        });
      }
    });
  }

  cancelarEdicion() {
    this.filaEditando = null;
    this.editTitulo = '';
    this.editImagen = null;
    this.previewUrlEditar = null;
  }

  eliminarCohorte(id: number) {

    Swal.fire({
      title: '¿Eliminar cohorte?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.cohorteService.deleteCohorte(id).subscribe({
          next: () => {

            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'La cohorte se eliminó correctamente.'
            });

            this.cargarCohortes();

          },
          error: (err) => {
            console.error('Error al eliminar:', err);

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la cohorte.'
            });
          }
        });
      }
    });
  }
}
