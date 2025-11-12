import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Servicios
import { EventosService, Evento } from './eventos.service';
import { PodcastService, Podcast } from './podcast.service';
import { PortadaService, Portada } from './portada.service';
import { GaleriaService, Galeria } from './galeria.service';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [CommonModule, FormsModule]
})
export class IndexComponent implements OnInit {
  // ======= GALERÍA =======
  galeria: Galeria[] = [];

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
    private portadaService: PortadaService,
    private galeriaService: GaleriaService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.cargarEventos();
    this.cargarPodcasts();
    this.cargarPortada();
    this.cargarGaleria();
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

  // ======================================================
  // =================== PORTADA ==========================
  // ======================================================

  portadas: Portada[] = [];
  portadaSeleccionada: Portada | null = null;
  editTitulo: string = '';
  imagenSeleccionada: File | null = null;
  previewImagen: string | null = null;
  mostrarFormularioPortada: boolean = false;

  cargarPortada(): void {
    this.portadaService.getAllPortadas().subscribe({
      next: (data: Portada[]) => {
        this.portadas = data;
        if (data.length > 0) {
          this.portadaSeleccionada = data[0];
          this.editTitulo = data[0].titulo;
        }
      },
      error: (err: any) => {
        console.error('Error al cargar la portada:', err);
        Swal.fire('Error', 'No se pudo cargar la portada.', 'error');
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImagen = reader.result as string;
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    }
  }

  abrirFormularioPortada(): void {
    this.mostrarFormularioPortada = true;
  }

  cerrarFormularioPortada(): void {
    this.mostrarFormularioPortada = false;
    this.cancelarEdicionPortada();
  }

  actualizarPortada(): void {
    if (!this.portadaSeleccionada) {
      Swal.fire('Error', 'No hay portada seleccionada.', 'error');
      return;
    }

    const tituloNoCambiado = this.editTitulo === this.portadaSeleccionada.titulo;
    const imagenNoSeleccionada = !this.imagenSeleccionada;

    if (tituloNoCambiado && imagenNoSeleccionada) {
      Swal.fire('Sin cambios', 'No se detectaron modificaciones para actualizar.', 'info');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.editTitulo);
    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    this.portadaService
      .updatePortada(this.portadaSeleccionada.id_portada, formData)
      .subscribe({
        next: (actualizada: Portada) => {
          Swal.fire('Actualizado', 'La portada se actualizó correctamente.', 'success');
          this.portadaSeleccionada = actualizada;
          this.imagenSeleccionada = null;
          this.previewImagen = null;
          this.mostrarFormularioPortada = false;
        },
        error: (err: any) => {
          console.error('Error al actualizar la portada:', err);
          Swal.fire('Error', 'No se pudo actualizar la portada.', 'error');
        }
      });
  }

  cancelarEdicionPortada(): void {
    if (this.portadaSeleccionada) {
      this.editTitulo = this.portadaSeleccionada.titulo;
      this.imagenSeleccionada = null;
      this.previewImagen = null;
    }
  }


  // ======================================================
  // =================== GALERÍA ===========================
  // ======================================================

  cargarGaleria(): void {
    this.galeriaService.getAllGaleria().subscribe({
      next: (data: Galeria[]) => {
        this.galeria = data;
      },
      error: (err) => {
        console.error('Error al cargar la galería:', err);
        Swal.fire('Error', 'No se pudo cargar la galería.', 'error');
      }
    });
  }

  mostrarFormularioGaleria: boolean = false;
  nuevaGaleria: Partial<Galeria> = { titulo: '', url: '' };
  imagenSeleccionadaGaleria: File | null = null;

  abrirFormularioGaleria(): void {
    this.mostrarFormularioGaleria = true;
  }

  cancelarNuevaGaleria(): void {
    this.mostrarFormularioGaleria = false;
    this.nuevaGaleria = { titulo: '', url: '' };
    this.imagenSeleccionadaGaleria = null;
  }

  onFileSelectedGaleria(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionadaGaleria = input.files[0];
    }
  }

  guardarNuevaGaleria(): void {
    const { titulo, url } = this.nuevaGaleria;

    if (!titulo || !url || !this.imagenSeleccionadaGaleria) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos e incluye una imagen antes de guardar.'
      });
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('url', url);
    formData.append('imagen', this.imagenSeleccionadaGaleria);

    this.galeriaService.createGaleriaConImagen(formData).subscribe({
      next: (galeriaCreada) => {
        this.galeria.push(galeriaCreada);
        Swal.fire({
          icon: 'success',
          title: 'Imagen agregada',
          text: 'La imagen se agregó correctamente a la galería.'
        });
        this.cancelarNuevaGaleria();
      },
      error: (err) => {
        console.error('Error al guardar la imagen:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo guardar la imagen. Inténtalo nuevamente.'
        });
      }
    });
  }

  // ======= EDITAR (PUT) GALERÍA =======
  mostrarFormularioEdicionGaleria: boolean = false;
  galeriaEditandoId: number | null = null;
  editGaleria: Partial<Galeria> = { titulo: '', url: '' };
  imagenSeleccionadaEdicionGaleria: File | null = null;
  previewImagenGaleria: string | null = null;

  abrirEdicionGaleria(item: Galeria): void {
    this.galeriaEditandoId = item.id_galeria;
    this.editGaleria = { titulo: item.titulo, url: item.url };
    this.mostrarFormularioEdicionGaleria = true;
    this.previewImagenGaleria = 'http://localhost:3000/' + item.imagen;
  }

  onFileSelectedEdicionGaleria(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionadaEdicionGaleria = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImagenGaleria = reader.result as string;
      };
      reader.readAsDataURL(this.imagenSeleccionadaEdicionGaleria);
    }
  }

  guardarEdicionGaleria(): void {
    if (!this.galeriaEditandoId) return;

    const { titulo, url } = this.editGaleria;
    if (!titulo || !url) {
      Swal.fire('Campos incompletos', 'Completa todos los campos antes de guardar.', 'warning');
      return;
    }

    const original = this.galeria.find(g => g.id_galeria === this.galeriaEditandoId);
    if (!original) return;

    const tituloSinCambio = titulo === original.titulo;
    const urlSinCambio = url === original.url;
    const imagenSinCambio = !this.imagenSeleccionadaEdicionGaleria;

    if (tituloSinCambio && urlSinCambio && imagenSinCambio) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No se detectaron modificaciones para actualizar.',
        confirmButtonColor: '#003366'
      });
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('url', url);
    if (this.imagenSeleccionadaEdicionGaleria) {
      formData.append('imagen', this.imagenSeleccionadaEdicionGaleria);
    }

    this.galeriaService.updateGaleria(this.galeriaEditandoId, formData).subscribe({
      next: (actualizada) => {
        const index = this.galeria.findIndex(g => g.id_galeria === this.galeriaEditandoId);
        if (index !== -1) this.galeria[index] = actualizada;

        Swal.fire('Actualizada', 'La imagen se actualizó correctamente.', 'success');
        this.cancelarEdicionGaleria();
      },
      error: (err) => {
        console.error('Error al actualizar la galería:', err);
        Swal.fire('Error', 'No se pudo actualizar la imagen.', 'error');
      }
    });
  }

  cancelarEdicionGaleria(): void {
    this.mostrarFormularioEdicionGaleria = false;
    this.galeriaEditandoId = null;
    this.editGaleria = { titulo: '', url: '' };
    this.imagenSeleccionadaEdicionGaleria = null;
    this.previewImagenGaleria = null;
  }

  // ======= ELIMINAR (DELETE) GALERÍA =======
  eliminarGaleria(id_galeria: number): void {
    Swal.fire({
      title: '¿Eliminar imagen?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.galeriaService.deleteGaleria(id_galeria).subscribe({
          next: () => {
            this.galeria = this.galeria.filter(g => g.id_galeria !== id_galeria);
            Swal.fire({
              icon: 'success',
              title: 'Eliminada',
              text: 'La imagen fue eliminada correctamente.'
            });
          },
          error: (err) => {
            console.error('Error al eliminar la imagen:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la imagen. Inténtalo nuevamente.'
            });
          }
        });
      }
    });
  }
}