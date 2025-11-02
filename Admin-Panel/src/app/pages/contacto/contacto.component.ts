// contacto.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Contacto } from './contacto.model';
import { ContactoService } from './contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit, OnDestroy {
  contactos: Contacto[] = [];
  loading = false;
  errorMsg: string | null = null;
  nuevoContacto: Contacto | null = null;
  contactoEditando: Contacto | null = null;
  private destroy$ = new Subject<void>();

  constructor(private contactoService: ContactoService) { }

  ngOnInit(): void {
    this.cargarContactos();
  }

  cargarContactos(): void {
    this.loading = true;
    this.errorMsg = null;

    this.contactoService.getContactos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.contactos = data;
          this.loading = false;
        },
        error: (err: any) => {
          this.errorMsg = err?.message ?? 'Error al obtener contactos';
          console.error('GET contactos error', err);
          this.loading = false;
        }
      });
  }

  eliminarContacto(id_contacto?: number): void {
    if (!id_contacto) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactoService.eliminarContacto(id_contacto)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Contacto Eliminado',
                text: 'Contacto eliminado correctamente',
                timer: 2000,
                showConfirmButton: true
              });
              console.log(`Contacto con id ${id_contacto} eliminado`);
              this.cargarContactos();
            },
            error: (err: any) => {
              console.error('Error al eliminar el contacto:', err);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el contacto',
              });
            }
          });
      }
    });
  }

  agregarContacto(): void {
    this.nuevoContacto = { id: 0, nombre: '', puesto: '', correo: '', telefono: '' } as Contacto;
  }

  guardarNuevoContacto(): void {
    if (!this.nuevoContacto) return;

    const { nombre, puesto, correo, telefono } = this.nuevoContacto;

    if (!nombre || !puesto || !correo || !telefono) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos',
      });
      return;
    }

    this.contactoService.createContacto(this.nuevoContacto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Contacto guardado',
            text: 'El contacto se ha guardado exitosamente',
            timer: 2000,
            showConfirmButton: true
          });
          this.nuevoContacto = null;
          this.cargarContactos();
        },
        error: (err) => {
          console.error('Error al guardar contacto:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al guardar el contacto',
          });
        }
      });
  }

  cancelarNuevoContacto(): void {
    this.nuevoContacto = null;
  }

  editarContacto(contacto: Contacto): void {
    this.contactoEditando = { ...contacto };
  }

  guardarEdicion(): void {
    if (!this.contactoEditando) return;

    const { id_contacto, nombre, puesto, correo, telefono } = this.contactoEditando;

    if (!nombre || !puesto || !correo || !telefono) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos',
      });
      return;
    }

    this.contactoService.actualizarContacto(id_contacto!, this.contactoEditando)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Contacto actualizado',
            text: 'Los datos del contacto fueron actualizados correctamente',
            timer: 2000,
            showConfirmButton: true
          });
          this.contactoEditando = null;
          this.cargarContactos();
        },
        error: (err) => {
          console.error('Error al actualizar contacto:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al actualizar el contacto',
          });
        }
      });
  }

  cancelarEdicion(): void {
    this.contactoEditando = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
