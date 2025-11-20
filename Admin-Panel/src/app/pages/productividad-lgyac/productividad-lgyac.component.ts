import { Component, OnInit } from '@angular/core';
import { LgacArticulosService, LgacArticulo } from './lgacArticulos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productividad-lgyac',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productividad-lgyac.component.html',
  styleUrls: ['./productividad-lgyac.component.css'],
})
export class ProductividadLgyacComponent implements OnInit {

  articulos: LgacArticulo[] = [];

  mostrarFormulario = false;

  nuevoArticulo = {
    titulo: '',
    descripcion: '',
    url: '',
  };

  constructor(private lgacService: LgacArticulosService) { }

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.lgacService.getArticulos().subscribe({
      next: (data) => {
        this.articulos = data;
      },
      error: (err) => {
        console.error('Error al obtener artículos:', err);
      }
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.nuevoArticulo = { titulo: '', descripcion: '', url: '' };
  }

  guardarArticulo(): void {

    if (!this.nuevoArticulo.titulo || !this.nuevoArticulo.descripcion || !this.nuevoArticulo.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.lgacService.crearArticulo(this.nuevoArticulo).subscribe({
      next: (res) => {
        this.cargarArticulos();
        this.cancelar();

        Swal.fire({
          icon: 'success',
          title: 'Artículo agregado',
          text: 'El artículo se ha agregado correctamente.',
          confirmButtonColor: '#7066e0'
        });
      },
      error: (err) => {
        console.error('Error al crear artículo:', err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar el artículo. Intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  abrirArticulo(url: string): void {
    if (url) window.open(url, '_blank');
  }

  articuloEditando: LgacArticulo | null = null;
  articuloOriginal: LgacArticulo | null = null;

  editarArticulo(art: LgacArticulo): void {
    this.articuloEditando = { ...art };
    this.articuloOriginal = { ...art };
  }

  cancelarEdicion(): void {
    this.articuloEditando = null;
  }

  actualizarArticulo(): void {
    if (!this.articuloEditando || !this.articuloOriginal) return;

    const noHayCambios =
      this.articuloEditando.titulo === this.articuloOriginal.titulo &&
      this.articuloEditando.descripcion === this.articuloOriginal.descripcion &&
      this.articuloEditando.url === this.articuloOriginal.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el artículo.',
        confirmButtonColor: '#7066e0'
      });

      this.articuloEditando = null;
      this.articuloOriginal = null;
      return;
    }

    this.lgacService.actualizarArticulo(this.articuloEditando.id_articulo, this.articuloEditando)
      .subscribe({
        next: (res) => {

          Swal.fire({
            icon: 'success',
            title: 'Artículo actualizado',
            text: 'Los cambios se guardaron correctamente.',
            confirmButtonColor: '#7066e0'
          });

          this.articuloEditando = null;
          this.articuloOriginal = null;
          this.cargarArticulos();
        },
        error: (err) => {
          console.error('Error al actualizar artículo:', err);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el artículo. Intenta nuevamente.',
            confirmButtonColor: '#dc3545'
          });
        }
      });
  }

  confirmarEliminar(id: number): void {
    Swal.fire({
      title: '¿Eliminar artículo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarArticulo(id);
      }
    });
  }

  eliminarArticulo(id: number): void {

    this.lgacService.eliminarArticulo(id).subscribe({
      next: (res) => {

        Swal.fire({
          icon: 'success',
          title: 'Artículo eliminado',
          text: 'El artículo se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.articuloEditando?.id_articulo === id) {
          this.articuloEditando = null;
          this.articuloOriginal = null;
        }

        this.cargarArticulos();
      },

      error: (err) => {
        console.error('Error al eliminar artículo:', err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el artículo. Intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }
}
