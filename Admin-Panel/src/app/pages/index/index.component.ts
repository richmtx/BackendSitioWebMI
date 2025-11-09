import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Servicios
import { EventosService, Evento } from './eventos.service';
import { PodcastService, Podcast } from './podcast.service';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [CommonModule, FormsModule]
})
export class IndexComponent implements OnInit {
  // ======= EVENTOS =======
  eventos: Evento[] = [];
  mostrarFormulario: boolean = false;
  nuevoEvento: Partial<Evento> = { titulo: '', fecha: '', lugar: '', descripcion: '' };
  eventoEditandoId: number | null = null;
  editEvento: Partial<Evento> = { titulo: '', fecha: '', lugar: '', descripcion: '' };

  // ======= PODCAST =======
  podcasts: Podcast[] = [];

  constructor(
    private eventosService: EventosService,
    private podcastService: PodcastService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.cargarEventos();
    this.cargarPodcasts();
  }

  // =====================================================
  // =================== EVENTOS ==========================
  // =====================================================
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

  // =====================================================
  // =================== PODCASTS =========================
  // =====================================================

  cargarPodcasts(): void {
    this.podcastService.getAllPodcast().subscribe({
      next: (data) => {
        this.podcasts = data;
      },
      error: (err) => console.error('Error al obtener los podcasts:', err)
    });
  }

  sanitizarURL(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  mostrarFormularioPodcast: boolean = false;

  nuevoPodcast: Partial<Podcast> = {
    titulo: '',
    url: '',
    descripcion: ''
  };

  // ======= POST PODCAST =======
  guardarNuevoPodcast(): void {
    const { titulo, url, descripcion } = this.nuevoPodcast;

    if (!titulo || !url || !descripcion) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.'
      });
      return;
    }

    this.podcastService.createPodcast(this.nuevoPodcast).subscribe({
      next: (podcastCreado) => {
        this.podcasts.push(podcastCreado);
        Swal.fire({
          icon: 'success',
          title: 'Podcast agregado',
          text: 'El podcast se agregó correctamente.'
        });
        this.nuevoPodcast = { titulo: '', url: '', descripcion: '' };
        this.mostrarFormularioPodcast = false;
      },
      error: (err) => {
        console.error('Error al agregar el podcast:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar el podcast. Inténtalo nuevamente.'
        });
      }
    });
  }

  cancelarNuevoPodcast(): void {
    this.mostrarFormularioPodcast = false;
    this.nuevoPodcast = { titulo: '', url: '', descripcion: '' };
  }

  // ======= EDITAR (PUT) PODCAST =======
  podcastEditandoId: number | null = null;
  editPodcast: Partial<Podcast> = { titulo: '', url: '', descripcion: '' };

  editarPodcast(podcast: Podcast): void {
    this.podcastEditandoId = podcast.id_podcast;
    this.editPodcast = { ...podcast };
  }

  guardarEdicionPodcast(podcastOriginal: Podcast): void {
    if (!this.podcastEditandoId) return;

    const { titulo, url, descripcion } = this.editPodcast;
    if (!titulo || !url || !descripcion) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.'
      });
      return;
    }

    this.podcastService.updatePodcast(this.podcastEditandoId, this.editPodcast).subscribe({
      next: (podcastActualizado) => {
        const index = this.podcasts.findIndex(p => p.id_podcast === podcastOriginal.id_podcast);
        if (index !== -1) this.podcasts[index] = podcastActualizado;

        Swal.fire({
          icon: 'success',
          title: 'Podcast actualizado',
          text: 'Los cambios se guardaron correctamente.'
        });
        this.podcastEditandoId = null;
        this.editPodcast = { titulo: '', url: '', descripcion: '' };
      },
      error: (err) => {
        console.error('Error al actualizar el podcast:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el podcast. Inténtalo nuevamente.'
        });
      }
    });
  }

  cancelarEdicionPodcast(): void {
    this.podcastEditandoId = null;
    this.editPodcast = { titulo: '', url: '', descripcion: '' };
  }

  // ======= ELIMINAR (DELETE) PODCAST =======
  eliminarPodcast(id_podcast: number): void {
    Swal.fire({
      title: '¿Eliminar podcast?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.podcastService.deletePodcast(id_podcast).subscribe({
          next: () => {
            this.podcasts = this.podcasts.filter(p => p.id_podcast !== id_podcast);
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El podcast fue eliminado correctamente.'
            });
          },
          error: (err) => {
            console.error('Error al eliminar el podcast:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el podcast. Inténtalo nuevamente.'
            });
          }
        });
      }
    });
  }
}