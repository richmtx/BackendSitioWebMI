import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EgresadosService } from './egresados.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-egresados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './egresados.component.html',
  styleUrls: ['./egresados.component.css']
})
export class EgresadosComponent implements OnInit {

  egresado: any = null;

  formularioImagenVisible = false;
  imagenSeleccionada: File | null = null;
  previewImagen: string | null = null;

  formularioUrlVisible = false;
  nuevaUrl: string = "";

  constructor(private egresadosService: EgresadosService) { }

  ngOnInit(): void {
    this.cargarEgresado();
  }

  cargarEgresado(): void {
    this.egresadosService.getEgresados().subscribe({
      next: (data) => {
        this.egresado = data[0];
      },
      error: (err) => console.error('Error cargando egresados:', err)
    });
  }

  abrirFormularioImagen(): void {
    this.formularioImagenVisible = true;
  }

  cancelarEdicionImagen(): void {
    this.formularioImagenVisible = false;
    this.imagenSeleccionada = null;
    this.previewImagen = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.imagenSeleccionada = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarNuevaImagen(): void {
    if (!this.imagenSeleccionada) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No has seleccionado una nueva imagen.',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const id = this.egresado.id_egresados;
    const formData = new FormData();
    formData.append('imagen', this.imagenSeleccionada);

    this.egresadosService.updateEgresado(id, formData).subscribe({
      next: (resp) => {
        this.egresado.imagen = resp.imagen;

        this.formularioImagenVisible = false;
        this.previewImagen = null;
        this.imagenSeleccionada = null;

        Swal.fire({
          icon: 'success',
          title: 'Imagen actualizada',
          text: 'La imagen se guardó correctamente.',
          confirmButtonText: 'Ok'
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar la imagen.',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }

  abrirEdicionUrl(): void {
    this.formularioUrlVisible = true;
    this.nuevaUrl = this.egresado.url;
  }

  cancelarEdicionUrl(): void {
    this.formularioUrlVisible = false;
    this.nuevaUrl = "";
  }

  guardarNuevaUrl(): void {

    if (!this.nuevaUrl.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'URL vacía',
        text: 'Por favor ingresa una URL válida.',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (this.nuevaUrl === this.egresado.url) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No se detectaron cambios en la URL.',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const id = this.egresado.id_egresados;
    const formData = new FormData();
    formData.append("url", this.nuevaUrl);

    this.egresadosService.updateEgresado(id, formData).subscribe({
      next: (resp) => {
        this.egresado.url = this.nuevaUrl;

        this.formularioUrlVisible = false;

        Swal.fire({
          icon: 'success',
          title: 'URL actualizada',
          text: 'El enlace fue actualizado correctamente.',
          confirmButtonText: 'Ok'
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No fue posible actualizar la URL.',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}
