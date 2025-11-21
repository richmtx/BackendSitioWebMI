import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// ======= SERVICES =======
import { LgacArticulosService, LgacArticulo } from './lgacArticulos.service';
import { LgacCapitulosService, LgacCapitulo } from './lgacCapitulos.service';
import { LgacProyectosService, LgacProyecto } from './lgacProyectos.service';

@Component({
  selector: 'app-productividad-lgyac',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productividad-lgyac.component.html',
  styleUrls: ['./productividad-lgyac.component.css'],
})
export class ProductividadLgyacComponent implements OnInit {

  // =====================================================
  // =================== LISTAS ==========================
  // =====================================================

  articulos: LgacArticulo[] = [];
  capitulos: LgacCapitulo[] = [];
  proyectos: LgacProyecto[] = [];

  // =====================================================
  // =================== ESTADOS FORMULARIOS =============
  // =====================================================

  mostrarFormulario = false;
  mostrarFormularioCapitulos = false;
  mostrarFormularioProyectos = false;

  // =====================================================
  // =================== NUEVOS REGISTROS ================
  // =====================================================

  nuevoArticulo = { titulo: '', descripcion: '', url: '' };
  nuevoCapitulo = { titulo: '', descripcion: '', url: '' };
  nuevoProyecto = { titulo: '', descripcion: '', url: '' };

  // =====================================================
  // =================== EDICIONES: ARTÍCULOS ============
  // =====================================================

  articuloEditando: LgacArticulo | null = null;
  articuloOriginal: LgacArticulo | null = null;

  // =====================================================
  // =================== EDICIONES: CAPÍTULOS ============
  // =====================================================

  capituloEditando: LgacCapitulo | null = null;
  capituloOriginal: LgacCapitulo | null = null;

  // =====================================================
  // =================== EDICIONES: PROYECTOS ============
  // =====================================================

  proyectoEditando: LgacProyecto | null = null;
  proyectoOriginal: LgacProyecto | null = null;


  // =====================================================
  // =================== CONSTRUCTOR =====================
  // =====================================================

  constructor(
    private lgacService: LgacArticulosService,
    private capitulosService: LgacCapitulosService,
    private proyectosService: LgacProyectosService
  ) {}

  // =====================================================
  // =================== NG ON INIT ======================
  // =====================================================

  ngOnInit(): void {
    this.cargarArticulos();
    this.cargarCapitulos();
    this.cargarProyectos();
  }

  // =====================================================
  // ======================= ARTÍCULOS ===================
  // =====================================================

  cargarArticulos(): void {
    this.lgacService.getArticulos().subscribe({
      next: (data) => this.articulos = data,
      error: (err) => console.error('Error al obtener artículos:', err)
    });
  }

  abrirArticulo(url: string): void {
    if (url) window.open(url, '_blank');
  }

  // ----- FORMULARIO NUEVO ARTÍCULO -----

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
      next: () => {
        this.cargarArticulos();
        this.cancelar();
        Swal.fire({
          icon: 'success',
          title: 'Artículo agregado',
          text: 'El artículo se ha agregado correctamente.',
          confirmButtonColor: '#7066e0'
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar el artículo. Intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  // ----- EDICIÓN ARTÍCULO -----

  editarArticulo(art: LgacArticulo): void {
    this.articuloEditando = { ...art };
    this.articuloOriginal = { ...art };
  }

  cancelarEdicion(): void {
    this.articuloEditando = null;
    this.articuloOriginal = null;
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
      this.cancelarEdicion();
      return;
    }

    this.lgacService.actualizarArticulo(this.articuloEditando.id_articulo, this.articuloEditando)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Artículo actualizado',
            text: 'Los cambios se guardaron correctamente.',
            confirmButtonColor: '#7066e0'
          });
          this.cancelarEdicion();
          this.cargarArticulos();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el artículo. Intenta nuevamente.',
            confirmButtonColor: '#dc3545'
          });
        }
      });
  }

  // ----- ELIMINAR ARTÍCULO -----

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
    }).then((r) => r.isConfirmed && this.eliminarArticulo(id));
  }

  eliminarArticulo(id: number): void {
    this.lgacService.eliminarArticulo(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo eliminado',
          text: 'El artículo se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.articuloEditando?.id_articulo === id) this.cancelarEdicion();
        this.cargarArticulos();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el artículo. Intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }


  // =====================================================
  // ======================= CAPÍTULOS ===================
  // =====================================================

  cargarCapitulos(): void {
    this.capitulosService.getCapitulos().subscribe({
      next: (data) => this.capitulos = data,
      error: (err) => console.error('Error al obtener capítulos:', err)
    });
  }

  abrirCapitulo(url: string): void {
    if (url) window.open(url, '_blank');
  }

  toggleFormularioCapitulos(): void {
    this.mostrarFormularioCapitulos = !this.mostrarFormularioCapitulos;
  }

  cancelarCapitulo(): void {
    this.mostrarFormularioCapitulos = false;
    this.nuevoCapitulo = { titulo: '', descripcion: '', url: '' };
  }

  guardarCapitulo(): void {
    if (!this.nuevoCapitulo.titulo || !this.nuevoCapitulo.descripcion || !this.nuevoCapitulo.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.capitulosService.crearCapitulo(this.nuevoCapitulo).subscribe({
      next: () => {
        this.cargarCapitulos();
        this.cancelarCapitulo();
        Swal.fire({
          icon: 'success',
          title: 'Capítulo agregado',
          text: 'El capítulo se ha agregado correctamente.',
          confirmButtonColor: '#7066e0'
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar el capítulo. Intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  editarCapitulo(cap: LgacCapitulo): void {
    this.capituloEditando = { ...cap };
    this.capituloOriginal = { ...cap };
  }

  cancelarEdicionCapitulo(): void {
    this.capituloEditando = null;
    this.capituloOriginal = null;
  }

  actualizarCapitulo(): void {
    if (!this.capituloEditando || !this.capituloOriginal) return;

    const noHayCambios =
      this.capituloEditando.titulo === this.capituloOriginal.titulo &&
      this.capituloEditando.descripcion === this.capituloOriginal.descripcion &&
      this.capituloEditando.url === this.capituloOriginal.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el capítulo.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicionCapitulo();
      return;
    }

    this.capitulosService.actualizarCapitulo(
      this.capituloEditando.id_capitulo,
      this.capituloEditando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Capítulo actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });
        this.cancelarEdicionCapitulo();
        this.cargarCapitulos();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el capítulo. Intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  confirmarEliminarCapitulo(id: number): void {
    Swal.fire({
      title: '¿Eliminar capítulo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarCapitulo(id));
  }

  eliminarCapitulo(id: number): void {
    this.capitulosService.eliminarCapitulo(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Capítulo eliminado',
          text: 'El capítulo se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.capituloEditando?.id_capitulo === id) this.cancelarEdicionCapitulo();
        this.cargarCapitulos();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el capítulo. Intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  // =====================================================
  // ======================= PROYECTOS ===================
  // =====================================================

  cargarProyectos(): void {
    this.proyectosService.getProyectos().subscribe({
      next: (data) => this.proyectos = data,
      error: (err) => console.error('Error al obtener proyectos:', err)
    });
  }

  abrirProyecto(url: string): void {
    if (url) window.open(url, '_blank');
  }

  toggleFormularioProyectos(): void {
    this.mostrarFormularioProyectos = !this.mostrarFormularioProyectos;
  }

  cancelarProyecto(): void {
    this.mostrarFormularioProyectos = false;
    this.nuevoProyecto = { titulo: '', descripcion: '', url: '' };
  }

  guardarProyecto(): void {
    if (!this.nuevoProyecto.titulo || !this.nuevoProyecto.descripcion || !this.nuevoProyecto.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.proyectosService.crearProyecto(this.nuevoProyecto).subscribe({
      next: () => {
        this.cargarProyectos();
        this.cancelarProyecto();
        Swal.fire({
          icon: 'success',
          title: 'Proyecto agregado',
          text: 'El proyecto se agregó correctamente.',
          confirmButtonColor: '#7066e0'
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar el proyecto. Intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  editarProyecto(proy: LgacProyecto): void {
    this.proyectoEditando = { ...proy };
    this.proyectoOriginal = { ...proy };
  }

  cancelarEdicionProyecto(): void {
    this.proyectoEditando = null;
    this.proyectoOriginal = null;
  }

  actualizarProyecto(): void {
    if (!this.proyectoEditando || !this.proyectoOriginal) return;

    const noHayCambios =
      this.proyectoEditando.titulo === this.proyectoOriginal.titulo &&
      this.proyectoEditando.descripcion === this.proyectoOriginal.descripcion &&
      this.proyectoEditando.url === this.proyectoOriginal.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el proyecto.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicionProyecto();
      return;
    }

    this.proyectosService.actualizarProyecto(
      this.proyectoEditando.id_proyecto,
      this.proyectoEditando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });
        this.cancelarEdicionProyecto();
        this.cargarProyectos();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el proyecto. Intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  confirmarEliminarProyecto(id: number): void {
    Swal.fire({
      title: '¿Eliminar proyecto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarProyecto(id));
  }

  eliminarProyecto(id: number): void {
    this.proyectosService.eliminarProyecto(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto eliminado',
          text: 'El proyecto se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.proyectoEditando?.id_proyecto === id) this.cancelarEdicionProyecto();
        this.cargarProyectos();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el proyecto. Intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }
}
