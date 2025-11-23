import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// ======= SERVICES =======
import { LgacArticulosService, LgacArticulo } from './lgacArticulos.service';
import { LgacCapitulosService, LgacCapitulo } from './lgacCapitulos.service';
import { LgacProyectosService, LgacProyecto } from './lgacProyectos.service';

import { LgacArticulos2Service, LgacArticulo2 } from './lgacArticulos2.service';
import { LgacCapitulos2Service, LgacCapitulo2 } from './lgacCapitulos2.service';
import { LgacProyectos2Service, LgacProyecto2 } from './lgacProyectos2.service';

import { LgacArticulos3Service, LgacArticulo3 } from './lgacArticulos3.service';
import { LgacCapitulos3Service, LgacCapitulo3 } from './lgacCapitulos3.service';
import { LgacProyectos3Service, LgacProyecto3 } from './lgacProyectos3.service';

import { LgacArticulos4Service, LgacArticulo4 } from './lgacArticulos4.service';
import { LgacCapitulos4Service, LgacCapitulo4 } from './lgacCapitulos4.service';
import { LgacProyectos4Service, LgacProyecto4 } from './lgacProyectos4.service';

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
  articulos2: LgacArticulo2[] = [];
  capitulos2: LgacCapitulo2[] = [];
  proyectos2: LgacProyecto2[] = [];
  articulos3: LgacArticulo3[] = [];
  capitulos3: LgacCapitulo3[] = [];
  proyectos3: LgacProyecto3[] = [];
  articulos4: LgacArticulo4[] = [];
  capitulos4: LgacCapitulo4[] = [];
  proyectos4: LgacProyecto4[] = [];

  // =====================================================
  // =================== ESTADOS FORMULARIOS =============
  // =====================================================

  mostrarFormulario = false;
  mostrarFormularioCapitulos = false;
  mostrarFormularioProyectos = false;
  mostrarFormularioArticulos2 = false;
  mostrarFormularioCapitulos2 = false;
  mostrarFormularioProyectos2 = false;
  mostrarFormularioArticulos3 = false;
  mostrarFormularioCapitulos3 = false;
  mostrarFormularioProyectos3 = false;
  mostrarFormularioArticulos4 = false;
  mostrarFormularioCapitulos4 = false;
  mostrarFormularioProyectos4 = false;

  // =====================================================
  // =================== NUEVOS REGISTROS ================
  // =====================================================

  nuevoArticulo = { titulo: '', descripcion: '', url: '' };
  nuevoCapitulo = { titulo: '', descripcion: '', url: '' };
  nuevoProyecto = { titulo: '', descripcion: '', url: '' };
  nuevoArticulo2 = { titulo: '', descripcion: '', url: '' };
  nuevoCapitulo2 = { titulo: '', descripcion: '', url: '' };
  nuevoProyecto2 = { titulo: '', descripcion: '', url: '' };
  nuevoArticulo3 = { titulo: '', descripcion: '', url: '' };
  nuevoCapitulo3 = { titulo: '', descripcion: '', url: '' };
  nuevoProyecto3 = { titulo: '', descripcion: '', url: '' };
  nuevoArticulo4 = { titulo: '', descripcion: '', url: '' };
  nuevoCapitulo4 = { titulo: '', descripcion: '', url: '' };
  nuevoProyecto4 = { titulo: '', descripcion: '', url: '' };

  // =====================================================
  // =================== EDICIONES: ARTÍCULOS ============
  // =====================================================

  articuloEditando: LgacArticulo | null = null;
  articuloOriginal: LgacArticulo | null = null;
  articulo2Editando: LgacArticulo2 | null = null;
  articulo2Original: LgacArticulo2 | null = null;
  articulo3Editando: LgacArticulo3 | null = null;
  articulo3Original: LgacArticulo3 | null = null;
  articulo4Editando: LgacArticulo4 | null = null;
  articulo4Original: LgacArticulo4 | null = null;

  // =====================================================
  // =================== EDICIONES: CAPÍTULOS ============
  // =====================================================

  capituloEditando: LgacCapitulo | null = null;
  capituloOriginal: LgacCapitulo | null = null;
  capitulo2Editando: LgacCapitulo2 | null = null;
  capitulo2Original: LgacCapitulo2 | null = null;
  capitulo3Editando: LgacCapitulo3 | null = null;
  capitulo3Original: LgacCapitulo3 | null = null;
  capitulo4Editando: LgacCapitulo4 | null = null;
  capitulo4Original: LgacCapitulo4 | null = null;

  // =====================================================
  // =================== EDICIONES: PROYECTOS ============
  // =====================================================

  proyectoEditando: LgacProyecto | null = null;
  proyectoOriginal: LgacProyecto | null = null;
  proyecto2Editando: LgacProyecto2 | null = null;
  proyecto2Original: LgacProyecto2 | null = null;
  proyecto3Editando: LgacProyecto3 | null = null;
  proyecto3Original: LgacProyecto3 | null = null;
  proyecto4Editando: LgacProyecto4 | null = null;
  proyecto4Original: LgacProyecto4 | null = null;

  // =====================================================
  // =================== CONSTRUCTOR =====================
  // =====================================================

  constructor(
    private lgacService: LgacArticulosService,
    private capitulosService: LgacCapitulosService,
    private proyectosService: LgacProyectosService,
    private lgacArticulos2Service: LgacArticulos2Service,
    private lgacCapitulos2Service: LgacCapitulos2Service,
    private lgacProyectos2Service: LgacProyectos2Service,
    private articulos3Service: LgacArticulos3Service,
    private LgacCapitulos3Service: LgacCapitulos3Service,
    private LgacProyectos3Service: LgacProyectos3Service,
    private lgacArticulos4Service: LgacArticulos4Service,
    private lgacCapitulos4Service: LgacCapitulos4Service,
    private lgacProyectos4Service: LgacProyectos4Service
  ) { }

  // =====================================================
  // =================== NG ON INIT ======================
  // =====================================================

  ngOnInit(): void {
    this.cargarArticulos();
    this.cargarCapitulos();
    this.cargarProyectos();
    this.cargarArticulos2();
    this.cargarCapitulos2();
    this.cargarProyectos2();
    this.cargarArticulos3();
    this.cargarCapitulos3();
    this.cargarProyectos3();
    this.cargarArticulos4();
    this.cargarCapitulos4();
    this.cargarProyectos4();
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

  // =====================================================
  // ======================= ARTÍCULOS 2 =================
  // =====================================================

  cargarArticulos2(): void {
    this.lgacArticulos2Service.getArticulos().subscribe({
      next: (data) => this.articulos2 = data,
      error: (err) => console.error('Error al obtener artículos LGAC2:', err)
    });
  }

  abrirArticulo2(url: string): void {
    if (url) window.open(url, '_blank');
  }

  // ----- FORMULARIO NUEVO ARTÍCULO -----

  toggleFormularioArticulos2(): void {
    this.mostrarFormularioArticulos2 = !this.mostrarFormularioArticulos2;
  }

  cancelarArticulo2(): void {
    this.mostrarFormularioArticulos2 = false;
    this.nuevoArticulo2 = { titulo: '', descripcion: '', url: '' };
  }

  guardarArticulo2(): void {
    if (!this.nuevoArticulo2.titulo || !this.nuevoArticulo2.descripcion || !this.nuevoArticulo2.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.lgacArticulos2Service.crearArticulo(this.nuevoArticulo2).subscribe({
      next: () => {
        this.cargarArticulos2();
        this.cancelarArticulo2();
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

  editarArticulo2(art: LgacArticulo2): void {
    this.articulo2Editando = { ...art };
    this.articulo2Original = { ...art };
  }

  cancelarEdicion2(): void {
    this.articulo2Editando = null;
    this.articulo2Original = null;
  }

  actualizarArticulo2(): void {
    if (!this.articulo2Editando || !this.articulo2Original) return;

    const noHayCambios =
      this.articulo2Editando.titulo === this.articulo2Original.titulo &&
      this.articulo2Editando.descripcion === this.articulo2Original.descripcion &&
      this.articulo2Editando.url === this.articulo2Original.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el artículo.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicion2();
      return;
    }

    this.lgacArticulos2Service.actualizarArticulo(
      this.articulo2Editando.id_articulo,
      this.articulo2Editando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });
        this.cancelarEdicion2();
        this.cargarArticulos2();
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

  confirmarEliminarArticulo2(id: number): void {
    Swal.fire({
      title: '¿Eliminar artículo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarArticulo2(id));
  }

  eliminarArticulo2(id: number): void {
    this.lgacArticulos2Service.eliminarArticulo(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo eliminado',
          text: 'El artículo se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });
        if (this.articulo2Editando?.id_articulo === id) {
          this.cancelarEdicion2();
        }
        this.cargarArticulos2();
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
  // ======================= CAPÍTULOS 2 =================
  // =====================================================

  cargarCapitulos2(): void {
    this.lgacCapitulos2Service.getCapitulos().subscribe({
      next: (data) => this.capitulos2 = data,
      error: (err) => console.error('Error al obtener capítulos LGAC2:', err)
    });
  }

  abrirCapitulo2(url: string): void {
    if (url) window.open(url, '_blank');
  }

  toggleFormularioCapitulos2(): void {
    this.mostrarFormularioCapitulos2 = !this.mostrarFormularioCapitulos2;
  }

  cancelarCapitulo2(): void {
    this.mostrarFormularioCapitulos2 = false;
    this.nuevoCapitulo2 = { titulo: '', descripcion: '', url: '' };
  }

  guardarCapitulo2(): void {
    if (!this.nuevoCapitulo2.titulo || !this.nuevoCapitulo2.descripcion || !this.nuevoCapitulo2.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.lgacCapitulos2Service.crearCapitulo(this.nuevoCapitulo2).subscribe({
      next: () => {
        this.cargarCapitulos2();
        this.cancelarCapitulo2();

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

  editarCapitulo2(cap: LgacCapitulo2): void {
    this.capitulo2Editando = { ...cap };
    this.capitulo2Original = { ...cap };
  }

  cancelarEdicionCapitulo2(): void {
    this.capitulo2Editando = null;
    this.capitulo2Original = null;
  }

  actualizarCapitulo2(): void {
    if (!this.capitulo2Editando || !this.capitulo2Original) return;

    const noHayCambios =
      this.capitulo2Editando.titulo === this.capitulo2Original.titulo &&
      this.capitulo2Editando.descripcion === this.capitulo2Original.descripcion &&
      this.capitulo2Editando.url === this.capitulo2Original.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el capítulo.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicionCapitulo2();
      return;
    }

    this.lgacCapitulos2Service.actualizarCapitulo(
      this.capitulo2Editando.id_capitulo,
      this.capitulo2Editando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Capítulo actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });

        this.cancelarEdicionCapitulo2();
        this.cargarCapitulos2();
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

  confirmarEliminarCapitulo2(id: number): void {
    Swal.fire({
      title: '¿Eliminar capítulo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarCapitulo2(id));
  }

  eliminarCapitulo2(id: number): void {
    this.lgacCapitulos2Service.eliminarCapitulo(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Capítulo eliminado',
          text: 'El capítulo se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });
        if (this.capitulo2Editando?.id_capitulo === id) {
          this.cancelarEdicionCapitulo2();
        }

        this.cargarCapitulos2();
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
  // ======================= PROYECTOS 2 =================
  // =====================================================

  cargarProyectos2(): void {
    this.lgacProyectos2Service.getProyectos().subscribe({
      next: (data) => this.proyectos2 = data,
      error: (err) => console.error('Error al obtener proyectos LGAC2:', err)
    });
  }

  abrirProyecto2(url: string): void {
    if (url) window.open(url, '_blank');
  }

  toggleFormularioProyectos2(): void {
    this.mostrarFormularioProyectos2 = !this.mostrarFormularioProyectos2;
  }

  cancelarProyecto2(): void {
    this.mostrarFormularioProyectos2 = false;
    this.nuevoProyecto2 = { titulo: '', descripcion: '', url: '' };
  }

  guardarProyecto2(): void {
    if (!this.nuevoProyecto2.titulo || !this.nuevoProyecto2.descripcion || !this.nuevoProyecto2.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.lgacProyectos2Service.crearProyecto(this.nuevoProyecto2).subscribe({
      next: () => {
        this.cargarProyectos2();
        this.cancelarProyecto2();

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

  editarProyecto2(proy: LgacProyecto2): void {
    this.proyecto2Editando = { ...proy };
    this.proyecto2Original = { ...proy };
  }

  cancelarEdicionProyecto2(): void {
    this.proyecto2Editando = null;
    this.proyecto2Original = null;
  }

  actualizarProyecto2(): void {
    if (!this.proyecto2Editando || !this.proyecto2Original) return;

    const noHayCambios =
      this.proyecto2Editando.titulo === this.proyecto2Original.titulo &&
      this.proyecto2Editando.descripcion === this.proyecto2Original.descripcion &&
      this.proyecto2Editando.url === this.proyecto2Original.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el proyecto.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicionProyecto2();
      return;
    }

    this.lgacProyectos2Service.actualizarProyecto(
      this.proyecto2Editando.id_proyecto,
      this.proyecto2Editando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });

        this.cancelarEdicionProyecto2();
        this.cargarProyectos2();
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

  confirmarEliminarProyecto2(id: number): void {
    Swal.fire({
      title: '¿Eliminar proyecto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarProyecto2(id));
  }

  eliminarProyecto2(id: number): void {
    this.lgacProyectos2Service.eliminarProyecto(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto eliminado',
          text: 'El proyecto se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.proyecto2Editando?.id_proyecto === id) {
          this.cancelarEdicionProyecto2();
        }

        this.cargarProyectos2();
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


  // =====================================================
  // ======================= ARTÍCULOS 3 =================
  // =====================================================

  cargarArticulos3(): void {
    this.articulos3Service.getArticulos().subscribe({
      next: (data) => this.articulos3 = data,
      error: (err) => console.error('Error al obtener artículos:', err)
    });
  }

  abrirArticulo3(url: string): void {
    if (url) window.open(url, '_blank');
  }

  // ----- FORMULARIO NUEVO ARTÍCULO -----

  toggleFormularioArticulo3(): void {
    this.mostrarFormularioArticulos3 = !this.mostrarFormularioArticulos3;
  }

  cancelarArticulo3(): void {
    this.mostrarFormularioArticulos3 = false;
    this.nuevoArticulo3 = { titulo: '', descripcion: '', url: '' };
  }

  guardarArticulo3(): void {
    if (!this.nuevoArticulo3.titulo || !this.nuevoArticulo3.descripcion || !this.nuevoArticulo3.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.articulos3Service.crearArticulo(this.nuevoArticulo3).subscribe({
      next: () => {
        this.cargarArticulos3();
        this.cancelarArticulo3();

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

  editarArticulo3(art: LgacArticulo3): void {
    this.articulo3Editando = { ...art };
    this.articulo3Original = { ...art };
  }

  cancelarEdicionArticulo3(): void {
    this.articulo3Editando = null;
    this.articulo3Original = null;
  }

  actualizarArticulo3(): void {
    if (!this.articulo3Editando || !this.articulo3Original) return;

    const noHayCambios =
      this.articulo3Editando.titulo === this.articulo3Original.titulo &&
      this.articulo3Editando.descripcion === this.articulo3Original.descripcion &&
      this.articulo3Editando.url === this.articulo3Original.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el artículo.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicionArticulo3();
      return;
    }

    this.articulos3Service.actualizarArticulo(
      this.articulo3Editando.id_articulo,
      this.articulo3Editando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });

        this.cancelarEdicionArticulo3();
        this.cargarArticulos3();
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

  // ----- ELIMINAR ARTÍCULO 3 -----

  confirmarEliminarArticulo3(id: number): void {
    Swal.fire({
      title: '¿Eliminar artículo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarArticulo3(id));
  }

  eliminarArticulo3(id: number): void {
    this.articulos3Service.eliminarArticulo(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo eliminado',
          text: 'El artículo se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.articulo3Editando?.id_articulo === id) {
          this.cancelarEdicionArticulo3();
        }

        this.cargarArticulos3();
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
  // ======================= CAPÍTULOS 3 =================
  // =====================================================

  cargarCapitulos3(): void {
    this.LgacCapitulos3Service.getCapitulos().subscribe({
      next: (data) => this.capitulos3 = data,
      error: (err) => console.error('Error al obtener capítulos LGAC3:', err)
    });
  }

  abrirCapitulo3(url: string): void {
    if (url) window.open(url, '_blank');
  }

  toggleFormularioCapitulos3(): void {
    this.mostrarFormularioCapitulos3 = !this.mostrarFormularioCapitulos3;
  }

  cancelarCapitulo3(): void {
    this.mostrarFormularioCapitulos3 = false;
    this.nuevoCapitulo3 = { titulo: '', descripcion: '', url: '' };
  }

  guardarCapitulo3(): void {
    if (!this.nuevoCapitulo3.titulo || !this.nuevoCapitulo3.descripcion || !this.nuevoCapitulo3.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.LgacCapitulos3Service.crearCapitulo(this.nuevoCapitulo3).subscribe({
      next: () => {
        this.cargarCapitulos3();
        this.cancelarCapitulo3();

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

  editarCapitulo3(cap: LgacCapitulo3): void {
    this.capitulo3Editando = { ...cap };
    this.capitulo3Original = { ...cap };
  }

  cancelarEdicionCapitulo3(): void {
    this.capitulo3Editando = null;
    this.capitulo3Original = null;
  }

  actualizarCapitulo3(): void {
    if (!this.capitulo3Editando || !this.capitulo3Original) return;

    const noHayCambios =
      this.capitulo3Editando.titulo === this.capitulo3Original.titulo &&
      this.capitulo3Editando.descripcion === this.capitulo3Original.descripcion &&
      this.capitulo3Editando.url === this.capitulo3Original.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el capítulo.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicionCapitulo3();
      return;
    }

    this.LgacCapitulos3Service.actualizarCapitulo(
      this.capitulo3Editando.id_capitulo,
      this.capitulo3Editando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Capítulo actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });

        this.cancelarEdicionCapitulo3();
        this.cargarCapitulos3();
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

  confirmarEliminarCapitulo3(id: number): void {
    Swal.fire({
      title: '¿Eliminar capítulo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarCapitulo3(id));
  }

  eliminarCapitulo3(id: number): void {
    this.LgacCapitulos3Service.eliminarCapitulo(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Capítulo eliminado',
          text: 'El capítulo se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.capitulo3Editando?.id_capitulo === id) {
          this.cancelarEdicionCapitulo3();
        }

        this.cargarCapitulos3();
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
  // ======================= PROYECTOS 3 =================
  // =====================================================

  cargarProyectos3(): void {
    this.LgacProyectos3Service.getProyectos().subscribe({
      next: (data) => this.proyectos3 = data,
      error: (err) => console.error('Error al obtener proyectos LGAC3:', err)
    });
  }

  abrirProyecto3(url: string): void {
    if (url) window.open(url, '_blank');
  }

  toggleFormularioProyectos3(): void {
    this.mostrarFormularioProyectos3 = !this.mostrarFormularioProyectos3;
  }

  cancelarProyecto3(): void {
    this.mostrarFormularioProyectos3 = false;
    this.nuevoProyecto3 = { titulo: '', descripcion: '', url: '' };
  }

  guardarProyecto3(): void {
    if (!this.nuevoProyecto3.titulo || !this.nuevoProyecto3.descripcion || !this.nuevoProyecto3.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.LgacProyectos3Service.crearProyecto(this.nuevoProyecto3).subscribe({
      next: () => {
        this.cargarProyectos3();
        this.cancelarProyecto3();

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

  editarProyecto3(proy: LgacProyecto3): void {
    this.proyecto3Editando = { ...proy };
    this.proyecto3Original = { ...proy };
  }

  cancelarEdicionProyecto3(): void {
    this.proyecto3Editando = null;
    this.proyecto3Original = null;
  }

  actualizarProyecto3(): void {
    if (!this.proyecto3Editando || !this.proyecto3Original) return;

    const noHayCambios =
      this.proyecto3Editando.titulo === this.proyecto3Original.titulo &&
      this.proyecto3Editando.descripcion === this.proyecto3Original.descripcion &&
      this.proyecto3Editando.url === this.proyecto3Original.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el proyecto.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicionProyecto3();
      return;
    }

    this.LgacProyectos3Service.actualizarProyecto(
      this.proyecto3Editando.id_proyecto,
      this.proyecto3Editando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });

        this.cancelarEdicionProyecto3();
        this.cargarProyectos3();
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

  confirmarEliminarProyecto3(id: number): void {
    Swal.fire({
      title: '¿Eliminar proyecto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarProyecto3(id));
  }

  eliminarProyecto3(id: number): void {
    this.LgacProyectos3Service.eliminarProyecto(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto eliminado',
          text: 'El proyecto se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.proyecto3Editando?.id_proyecto === id) {
          this.cancelarEdicionProyecto3();
        }

        this.cargarProyectos3();
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


  // =====================================================
  // ======================= ARTÍCULOS 4 =================
  // =====================================================

  cargarArticulos4(): void {
    this.lgacArticulos4Service.getArticulos().subscribe({
      next: (data) => this.articulos4 = data,
      error: (err) => console.error('Error al obtener artículos LGAC4:', err)
    });
  }

  abrirArticulo4(url: string): void {
    if (url) window.open(url, '_blank');
  }

  // ----- FORMULARIO NUEVO ARTÍCULO -----

  toggleFormularioArticulos4(): void {
    this.mostrarFormularioArticulos4 = !this.mostrarFormularioArticulos4;
  }

  cancelarArticulo4(): void {
    this.mostrarFormularioArticulos4 = false;
    this.nuevoArticulo4 = { titulo: '', descripcion: '', url: '' };
  }

  guardarArticulo4(): void {
    if (!this.nuevoArticulo4.titulo || !this.nuevoArticulo4.descripcion || !this.nuevoArticulo4.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.lgacArticulos4Service.crearArticulo(this.nuevoArticulo4).subscribe({
      next: () => {
        this.cargarArticulos4();
        this.cancelarArticulo4();

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

  editarArticulo4(art: LgacArticulo4): void {
    this.articulo4Editando = { ...art };
    this.articulo4Original = { ...art };
  }

  cancelarEdicionArticulo4(): void {
    this.articulo4Editando = null;
    this.articulo4Original = null;
  }

  actualizarArticulo4(): void {
    if (!this.articulo4Editando || !this.articulo4Original) return;

    const noHayCambios =
      this.articulo4Editando.titulo === this.articulo4Original.titulo &&
      this.articulo4Editando.descripcion === this.articulo4Original.descripcion &&
      this.articulo4Editando.url === this.articulo4Original.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el artículo.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicionArticulo4();
      return;
    }

    this.lgacArticulos4Service.actualizarArticulo(
      this.articulo4Editando.id_articulo,
      this.articulo4Editando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });

        this.cancelarEdicionArticulo4();
        this.cargarArticulos4();
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

  confirmarEliminarArticulo4(id: number): void {
    Swal.fire({
      title: '¿Eliminar artículo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarArticulo4(id));
  }

  eliminarArticulo4(id: number): void {
    this.lgacArticulos4Service.eliminarArticulo(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo eliminado',
          text: 'El artículo se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.articulo4Editando?.id_articulo === id) {
          this.cancelarEdicionArticulo4();
        }

        this.cargarArticulos4();
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
  // ======================= CAPÍTULOS 4 =================
  // =====================================================

  cargarCapitulos4(): void {
    this.lgacCapitulos4Service.getCapitulos().subscribe({
      next: (data) => this.capitulos4 = data,
      error: (err) => console.error('Error al obtener capítulos LGAC4:', err)
    });
  }

  abrirCapitulo4(url: string): void {
    if (url) window.open(url, '_blank');
  }

  toggleFormularioCapitulos4(): void {
    this.mostrarFormularioCapitulos4 = !this.mostrarFormularioCapitulos4;
  }

  cancelarCapitulo4(): void {
    this.mostrarFormularioCapitulos4 = false;
    this.nuevoCapitulo4 = { titulo: '', descripcion: '', url: '' };
  }

  guardarCapitulo4(): void {
    if (!this.nuevoCapitulo4.titulo || !this.nuevoCapitulo4.descripcion || !this.nuevoCapitulo4.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.lgacCapitulos4Service.crearCapitulo(this.nuevoCapitulo4).subscribe({
      next: () => {
        this.cargarCapitulos4();
        this.cancelarCapitulo4();

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

  editarCapitulo4(cap: LgacCapitulo4): void {
    this.capitulo4Editando = { ...cap };
    this.capitulo4Original = { ...cap };
  }

  cancelarEdicionCapitulo4(): void {
    this.capitulo4Editando = null;
    this.capitulo4Original = null;
  }

  actualizarCapitulo4(): void {
    if (!this.capitulo4Editando || !this.capitulo4Original) return;

    const noHayCambios =
      this.capitulo4Editando.titulo === this.capitulo4Original.titulo &&
      this.capitulo4Editando.descripcion === this.capitulo4Original.descripcion &&
      this.capitulo4Editando.url === this.capitulo4Original.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el capítulo.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicionCapitulo4();
      return;
    }

    this.lgacCapitulos4Service.actualizarCapitulo(
      this.capitulo4Editando.id_capitulo,
      this.capitulo4Editando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Capítulo actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });

        this.cancelarEdicionCapitulo4();
        this.cargarCapitulos4();
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

  confirmarEliminarCapitulo4(id: number): void {
    Swal.fire({
      title: '¿Eliminar capítulo?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarCapitulo4(id));
  }

  eliminarCapitulo4(id: number): void {
    this.lgacCapitulos4Service.eliminarCapitulo(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Capítulo eliminado',
          text: 'El capítulo se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.capitulo4Editando?.id_capitulo === id) {
          this.cancelarEdicionCapitulo4();
        }

        this.cargarCapitulos4();
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
  // ======================= PROYECTOS 3 =================
  // =====================================================

  cargarProyectos4(): void {
    this.lgacProyectos4Service.getProyectos().subscribe({
      next: (data) => this.proyectos4 = data,
      error: (err) => console.error('Error al obtener proyectos LGAC4:', err)
    });
  }

  abrirProyecto4(url: string): void {
    if (url) window.open(url, '_blank');
  }

  toggleFormularioProyectos4(): void {
    this.mostrarFormularioProyectos4 = !this.mostrarFormularioProyectos4;
  }

  cancelarProyecto4(): void {
    this.mostrarFormularioProyectos4 = false;
    this.nuevoProyecto4 = { titulo: '', descripcion: '', url: '' };
  }

  guardarProyecto4(): void {
    if (!this.nuevoProyecto4.titulo || !this.nuevoProyecto4.descripcion || !this.nuevoProyecto4.url) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de guardar.',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.lgacProyectos4Service.crearProyecto(this.nuevoProyecto4).subscribe({
      next: () => {
        this.cargarProyectos4();
        this.cancelarProyecto4();

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

  editarProyecto4(proy: LgacProyecto4): void {
    this.proyecto4Editando = { ...proy };
    this.proyecto4Original = { ...proy };
  }

  cancelarEdicionProyecto4(): void {
    this.proyecto4Editando = null;
    this.proyecto4Original = null;
  }

  actualizarProyecto4(): void {
    if (!this.proyecto4Editando || !this.proyecto4Original) return;

    const noHayCambios =
      this.proyecto4Editando.titulo === this.proyecto4Original.titulo &&
      this.proyecto4Editando.descripcion === this.proyecto4Original.descripcion &&
      this.proyecto4Editando.url === this.proyecto4Original.url;

    if (noHayCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No realizaste ningún cambio en el proyecto.',
        confirmButtonColor: '#7066e0'
      });
      this.cancelarEdicionProyecto4();
      return;
    }

    this.lgacProyectos4Service.actualizarProyecto(
      this.proyecto4Editando.id_proyecto,
      this.proyecto4Editando
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto actualizado',
          text: 'Los cambios se guardaron correctamente.',
          confirmButtonColor: '#7066e0'
        });

        this.cancelarEdicionProyecto4();
        this.cargarProyectos4();
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

  confirmarEliminarProyecto4(id: number): void {
    Swal.fire({
      title: '¿Eliminar proyecto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed && this.eliminarProyecto4(id));
  }

  eliminarProyecto4(id: number): void {
    this.lgacProyectos4Service.eliminarProyecto(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Proyecto eliminado',
          text: 'El proyecto se eliminó correctamente.',
          confirmButtonColor: '#7066e0'
        });

        if (this.proyecto4Editando?.id_proyecto === id) {
          this.cancelarEdicionProyecto4();
        }

        this.cargarProyectos4();
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