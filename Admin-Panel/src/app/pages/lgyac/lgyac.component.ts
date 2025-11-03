import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LgyacService, Lgyac } from './lgyac.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lgyac',
  standalone: true,
  templateUrl: './lgyac.component.html',
  styleUrls: ['./lgyac.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LgyacComponent implements OnInit {
  lgyacList: Lgyac[] = [];

  nuevaFilaActiva = false;
  nuevoLgac = '';
  nuevoObjetivo = '';

  filaEditando: number | null = null;
  editLgac = '';
  editObjetivo = '';

  constructor(private lgyacService: LgyacService) {}

  ngOnInit(): void {
    this.cargarDatosTabla();
  }

  cargarDatosTabla(): void {
    this.lgyacService.getAll().subscribe({
      next: (data) => (this.lgyacList = data),
      error: (err) => console.error('Error al cargar LGYAC:', err),
    });
  }

  // ---------- CREAR ----------
  agregarFilaLGYAC(): void {
    this.nuevaFilaActiva = true;
    this.nuevoLgac = '';
    this.nuevoObjetivo = '';
  }

  guardarNuevaFila(): void {
    if (!this.nuevoLgac.trim() || !this.nuevoObjetivo.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa ambos campos.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    this.lgyacService.create({ nombre: this.nuevoLgac, objetivos: this.nuevoObjetivo })
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Guardado!',
            text: 'El registro se ha agregado correctamente.',
            confirmButtonColor: '#3085d6',
          });
          this.cargarDatosTabla();
          this.nuevaFilaActiva = false;
        },
        error: (err) => {
          console.error('Error al guardar LGYAC:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo guardar el registro.',
            confirmButtonColor: '#d33',
          });
        },
      });
  }

  cancelarNuevaFila(): void {
    this.nuevaFilaActiva = false;
  }

  // ---------- EDITAR ----------
  editarFila(item: Lgyac): void {
    this.filaEditando = item.id_lgyac;
    this.editLgac = item.nombre;
    this.editObjetivo = item.objetivos;
  }

  guardarEdicion(item: Lgyac): void {
    if (!this.editLgac.trim() || !this.editObjetivo.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa ambos campos.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const actualizado = {
      nombre: this.editLgac.trim(),
      objetivos: this.editObjetivo.trim(),
    };

    this.lgyacService.update(item.id_lgyac, actualizado).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'El registro se actualizó correctamente.',
          confirmButtonColor: '#3085d6',
        });
        this.filaEditando = null;
        this.cargarDatosTabla();
      },
      error: (err) => {
        console.error('Error al actualizar LGYAC:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el registro.',
          confirmButtonColor: '#d33',
        });
      },
    });
  }

  cancelarEdicion(): void {
    this.filaEditando = null;
  }

  // ---------- ELIMINAR ----------
  eliminarFila(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lgyacService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El registro se eliminó correctamente.',
              confirmButtonColor: '#3085d6',
            });
            this.cargarDatosTabla();
          },
          error: (err) => {
            console.error('Error al eliminar LGYAC:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el registro.',
              confirmButtonColor: '#d33',
            });
          },
        });
      }
    });
  }
}
