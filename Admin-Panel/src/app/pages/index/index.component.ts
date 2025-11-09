import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EventosService, Evento } from './eventos.service';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [CommonModule, FormsModule]
})
export class IndexComponent implements OnInit {
  eventos: Evento[] = [];
  mostrarFormulario: boolean = false;

  nuevoEvento: Partial<Evento> = { titulo: '', fecha: '', lugar: '', descripcion: '' };

  eventoEditandoId: number | null = null;
  editEvento: Partial<Evento> = { titulo: '', fecha: '', lugar: '', descripcion: '' };

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventosService.getAllEventos().subscribe({
      next: (data) => (this.eventos = data),
      error: (err) => console.error('Error al obtener los eventos:', err)
    });
  }

  // ======= POST EVENTOS =======
  guardarNuevoEvento(): void {
    const { titulo, fecha, lugar, descripcion } = this.nuevoEvento;
    if (!titulo || !fecha || !lugar || !descripcion) {
      Swal.fire('Campos incompletos', 'Por favor completa todos los campos.', 'warning');
      return;
    }

    this.eventosService.createEvento(this.nuevoEvento).subscribe({
      next: (eventoCreado) => {
        this.eventos.push(eventoCreado);
        Swal.fire('Evento agregado', 'El evento se agregó correctamente.', 'success');
        this.nuevoEvento = { titulo: '', fecha: '', lugar: '', descripcion: '' };
        this.mostrarFormulario = false;
      },
      error: () => Swal.fire('Error', 'No se pudo agregar el evento.', 'error')
    });
  }

  cancelarNuevoEvento(): void {
    this.mostrarFormulario = false;
    this.nuevoEvento = { titulo: '', fecha: '', lugar: '', descripcion: '' };
  }

  // ======= EDITAR (PUT) EVENTOS =======
  editarEvento(evento: Evento): void {
    this.eventoEditandoId = evento.id_evento;
    this.editEvento = { ...evento };
  }

  guardarEdicionEvento(eventoOriginal: Evento): void {
    if (!this.eventoEditandoId) return;

    const { titulo, fecha, lugar, descripcion } = this.editEvento;
    if (!titulo || !fecha || !lugar || !descripcion) {
      Swal.fire('Campos incompletos', 'Por favor completa todos los campos.', 'warning');
      return;
    }

    this.eventosService.updateEvento(this.eventoEditandoId, this.editEvento).subscribe({
      next: (eventoActualizado) => {
        const index = this.eventos.findIndex(e => e.id_evento === eventoOriginal.id_evento);
        if (index !== -1) this.eventos[index] = eventoActualizado;

        Swal.fire('Evento actualizado', 'Los cambios se guardaron correctamente.', 'success');
        this.eventoEditandoId = null;
        this.editEvento = { titulo: '', fecha: '', lugar: '', descripcion: '' };
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar el evento.', 'error')
    });
  }

  cancelarEdicion(): void {
    this.eventoEditandoId = null;
    this.editEvento = { titulo: '', fecha: '', lugar: '', descripcion: '' };
  }

  // ======= ELIMINAR (DELETE) EVENTOS =======
  eliminarEvento(id_evento: number): void {
    Swal.fire({
      title: '¿Eliminar evento?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventosService.deleteEvento(id_evento).subscribe({
          next: () => {
            this.eventos = this.eventos.filter(e => e.id_evento !== id_evento);
            Swal.fire('Eliminado', 'El evento fue eliminado correctamente.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar el evento:', err);
            Swal.fire('Error', 'No se pudo eliminar el evento.', 'error');
          }
        });
      }
    });
  }
}