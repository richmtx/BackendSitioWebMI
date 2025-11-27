import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RequisitosIngresoService, RequisitoIngreso } from './requisitos-ingreso.service';

@Component({
  selector: 'app-requisitos-ingreso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requisitos-ingreso.component.html',
  styleUrls: ['./requisitos-ingreso.component.css']
})
export class RequisitosIngresoComponent implements OnInit {
  antecedentes: RequisitoIngreso[] = [];
  requisitos: RequisitoIngreso[] = [];
  seleccion: RequisitoIngreso[] = [];
  urls: RequisitoIngreso[] = [];

  // POST Antecedentes
  nuevoAntecedenteActivo = false;
  nuevoAntecedente = '';

  // POST Requisitos
  nuevoRequisitoActivo = false;
  nuevoRequisito = '';

  // PUT (compartido)
  editingId: number | null = null;
  editDescripcion = '';

  constructor(private requisitosService: RequisitosIngresoService) { }

  ngOnInit(): void {
    this.cargarRequisitos();
  }

  cargarRequisitos(): void {
    this.requisitosService.getAll().subscribe({
      next: (data) => {
        this.antecedentes = data.filter(i => i.categoria === 'antecedentes');
        this.requisitos = data.filter(i => i.categoria === 'requisitos');
        this.seleccion = data.filter(i => i.categoria === 'seleccion');
        this.urls = data.filter(i => i.categoria === 'URLs');
      },
      error: (err) => console.error('Error al cargar los requisitos:', err)
    });
  }

  // === POST: Antecedentes ===
  activarNuevoAntecedente(): void {
    this.nuevoAntecedenteActivo = true;
  }

  cancelarNuevoAntecedente(): void {
    this.nuevoAntecedenteActivo = false;
    this.nuevoAntecedente = '';
  }

  guardarNuevoAntecedente(): void {
    const descripcion = this.nuevoAntecedente.trim();
    if (!descripcion) {
      Swal.fire('Campo vacío', 'Por favor ingresa un antecedente válido.', 'warning');
      return;
    }
    this.requisitosService.create({ categoria: 'antecedentes', descripcion }).subscribe({
      next: (res) => {
        Swal.fire('¡Agregado!', 'El antecedente se ha guardado correctamente.', 'success');
        this.antecedentes.push(res);
        this.nuevoAntecedente = '';
        this.nuevoAntecedenteActivo = false;
      },
      error: () => Swal.fire('Error', 'No se pudo guardar el antecedente.', 'error')
    });
  }

  // === POST: Requisitos ===
  activarNuevoRequisito(): void {
    this.nuevoRequisitoActivo = true;
  }

  cancelarNuevoRequisito(): void {
    this.nuevoRequisitoActivo = false;
    this.nuevoRequisito = '';
  }

  guardarNuevoRequisito(): void {
    const descripcion = this.nuevoRequisito.trim();
    if (!descripcion) {
      Swal.fire('Campo vacío', 'Por favor ingresa un requisito válido.', 'warning');
      return;
    }
    this.requisitosService.create({ categoria: 'requisitos', descripcion }).subscribe({
      next: (res) => {
        Swal.fire('¡Agregado!', 'El requisito se ha guardado correctamente.', 'success');
        this.requisitos.push(res);
        this.nuevoRequisito = '';
        this.nuevoRequisitoActivo = false;
      },
      error: () => Swal.fire('Error', 'No se pudo guardar el requisito.', 'error')
    });
  }

  // === POST: Selección ===
  nuevoSeleccionActivo = false;
  nuevoSeleccion = '';

  activarNuevoSeleccion(): void {
    this.nuevoSeleccionActivo = true;
  }

  cancelarNuevoSeleccion(): void {
    this.nuevoSeleccionActivo = false;
    this.nuevoSeleccion = '';
  }

  guardarNuevoSeleccion(): void {
    const descripcion = this.nuevoSeleccion.trim();
    if (!descripcion) {
      Swal.fire('Campo vacío', 'Por favor ingresa un texto válido para la selección.', 'warning');
      return;
    }

    this.requisitosService.create({ categoria: 'seleccion', descripcion }).subscribe({
      next: (res) => {
        Swal.fire('¡Agregado!', 'El elemento de selección se ha guardado correctamente.', 'success');
        this.seleccion.push(res);
        this.nuevoSeleccion = '';
        this.nuevoSeleccionActivo = false;
      },
      error: () => Swal.fire('Error', 'No se pudo guardar el elemento de selección.', 'error')
    });
  }

  // === PUT: Antecedentes ===
  antecedenteOriginal: RequisitoIngreso | null = null;

  editarAntecedente(item: RequisitoIngreso): void {
    this.editingId = item.id_requisito;
    this.antecedenteOriginal = { ...item };
    this.editDescripcion = item.descripcion;
  }

  guardarEdicionAntecedente(item: RequisitoIngreso): void {
    const nuevoValor = this.editDescripcion.trim();

    if (!nuevoValor) {
      Swal.fire('Campo vacío', 'Por favor, ingresa un antecedente válido.', 'warning');
      return;
    }

    if (!this.antecedenteOriginal) {
      console.error("No hay datos originales para comparar.");
      return;
    }

    const sinCambios = nuevoValor === this.antecedenteOriginal.descripcion;

    if (sinCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones en este antecedente.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.requisitosService.update(item.id_requisito, { descripcion: nuevoValor }).subscribe({
      next: (res) => {
        if (res.updated) {
          const idx = this.antecedentes.findIndex(a => a.id_requisito === item.id_requisito);
          if (idx > -1) this.antecedentes[idx].descripcion = nuevoValor;

          Swal.fire('Actualizado', 'El antecedente fue actualizado correctamente.', 'success');
          this.cancelarEdicion();
          this.antecedenteOriginal = null;
        }
      },
      error: () =>
        Swal.fire('Error', 'Hubo un problema al actualizar el antecedente.', 'error')
    });
  }


  // === PUT: Requisitos ===
  requisitoOriginal: RequisitoIngreso | null = null;

  editarRequisito(item: RequisitoIngreso): void {
    this.editingId = item.id_requisito;
    this.requisitoOriginal = { ...item };
    this.editDescripcion = item.descripcion;
  }

  guardarEdicionRequisito(item: RequisitoIngreso): void {
    const nuevoValor = this.editDescripcion.trim();

    if (!nuevoValor) {
      Swal.fire('Campo vacío', 'Por favor, ingresa un requisito válido.', 'warning');
      return;
    }

    if (!this.requisitoOriginal) {
      console.error("No hay datos originales para comparar.");
      return;
    }

    const sinCambios = nuevoValor === this.requisitoOriginal.descripcion;

    if (sinCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones en este requisito.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.requisitosService.update(item.id_requisito, { descripcion: nuevoValor }).subscribe({
      next: (res) => {
        if (res.updated) {
          const idx = this.requisitos.findIndex(r => r.id_requisito === item.id_requisito);
          if (idx > -1) this.requisitos[idx].descripcion = nuevoValor;

          Swal.fire('Actualizado', 'El requisito fue actualizado correctamente.', 'success');
          this.cancelarEdicion();
          this.requisitoOriginal = null;
        }
      },
      error: () =>
        Swal.fire('Error', 'Hubo un problema al actualizar el requisito.', 'error')
    });
  }

  cancelarEdicion(): void {
    this.editingId = null;
    this.editDescripcion = '';
  }


  // === PUT: Selección ===
  seleccionOriginal: RequisitoIngreso | null = null;

  editarSeleccion(item: RequisitoIngreso): void {
    this.editingId = item.id_requisito;
    this.seleccionOriginal = { ...item };
    this.editDescripcion = item.descripcion;
  }


  guardarEdicionSeleccion(item: RequisitoIngreso): void {
    const nuevoValor = this.editDescripcion.trim();

    if (!nuevoValor) {
      Swal.fire('Campo vacío', 'Por favor, ingresa un texto válido para la selección.', 'warning');
      return;
    }

    if (!this.seleccionOriginal) {
      console.error("No hay datos originales para comparar.");
      return;
    }

    const sinCambios = nuevoValor === this.seleccionOriginal.descripcion;

    if (sinCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones en este elemento de selección.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.requisitosService.update(item.id_requisito, { descripcion: nuevoValor }).subscribe({
      next: (res) => {
        if (res.updated) {
          const idx = this.seleccion.findIndex(s => s.id_requisito === item.id_requisito);
          if (idx > -1) this.seleccion[idx].descripcion = nuevoValor;

          Swal.fire('Actualizado', 'El elemento de selección fue actualizado correctamente.', 'success');

          this.cancelarEdicion();
          this.seleccionOriginal = null;
        }
      },
      error: () =>
        Swal.fire('Error', 'Hubo un problema al actualizar el elemento de selección.', 'error')
    });
  }


  // === DELETE: Antecedentes ===
  eliminarAntecedente(item: RequisitoIngreso): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el antecedente seleccionado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.requisitosService.delete(item.id_requisito).subscribe({
          next: (res) => {
            if (res.deleted) {
              this.antecedentes = this.antecedentes.filter(a => a.id_requisito !== item.id_requisito);
              Swal.fire('¡Eliminado!', 'El antecedente fue eliminado correctamente.', 'success');
            } else {
              Swal.fire('Error', 'No se pudo eliminar el antecedente.', 'error');
            }
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            Swal.fire('Error', 'Hubo un problema al eliminar el antecedente.', 'error');
          }
        });
      }
    });
  }

  // === DELETE: Requisitos ===
  eliminarRequisito(item: RequisitoIngreso): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el requisito seleccionado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.requisitosService.delete(item.id_requisito).subscribe({
          next: (res) => {
            if (res.deleted) {
              this.requisitos = this.requisitos.filter(r => r.id_requisito !== item.id_requisito);
              Swal.fire('¡Eliminado!', 'El requisito fue eliminado correctamente.', 'success');
            } else {
              Swal.fire('Error', 'No se pudo eliminar el requisito.', 'error');
            }
          },
          error: (err) => {
            console.error('Error al eliminar el requisito:', err);
            Swal.fire('Error', 'Hubo un problema al eliminar el requisito.', 'error');
          }
        });
      }
    });
  }

  // === DELETE: Selección ===
  eliminarSeleccion(item: RequisitoIngreso): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el elemento de selección seleccionado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.requisitosService.delete(item.id_requisito).subscribe({
          next: (res) => {
            if (res.deleted) {
              this.seleccion = this.seleccion.filter(s => s.id_requisito !== item.id_requisito);
              Swal.fire('¡Eliminado!', 'El elemento de selección fue eliminado correctamente.', 'success');
            } else {
              Swal.fire('Error', 'No se pudo eliminar el elemento de selección.', 'error');
            }
          },
          error: (err) => {
            console.error('Error al eliminar el elemento de selección:', err);
            Swal.fire('Error', 'Hubo un problema al eliminar el elemento de selección.', 'error');
          }
        });
      }
    });
  }


  // === PUT: URLs ===
  urlOriginal: RequisitoIngreso | null = null;
  editandoConvocatoria = false;
  editandoSolicitud = false;
  nuevaURL = '';

  editarConvocatoria(url: RequisitoIngreso): void {
    this.editandoConvocatoria = true;
    this.editandoSolicitud = false;

    this.editingId = url.id_requisito;
    this.urlOriginal = { ...url };
    this.nuevaURL = url.descripcion;
  }

  editarSolicitud(url: RequisitoIngreso): void {
    this.editandoSolicitud = true;
    this.editandoConvocatoria = false;

    this.editingId = url.id_requisito;
    this.urlOriginal = { ...url };
    this.nuevaURL = url.descripcion;
  }

  cancelarEdicionURL(): void {
    this.editandoConvocatoria = false;
    this.editandoSolicitud = false;
    this.nuevaURL = '';
    this.editingId = null;
    this.urlOriginal = null;
  }

  guardarEdicionURL(): void {
    const nuevaDescripcion = this.nuevaURL.trim();

    if (!nuevaDescripcion) {
      Swal.fire('Campo vacío', 'Por favor, ingresa una URL válida.', 'warning');
      return;
    }

    if (!this.editingId) {
      Swal.fire('Error', 'No se encontró el elemento a actualizar.', 'error');
      return;
    }

    if (!this.urlOriginal) {
      console.error("No hay datos originales para comparar.");
      return;
    }

    const sinCambios = nuevaDescripcion === this.urlOriginal.descripcion;

    if (sinCambios) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios detectados',
        text: 'No realizaste modificaciones en esta URL.',
        timer: 2000,
        showConfirmButton: true
      });
      return;
    }

    this.requisitosService.update(this.editingId, { descripcion: nuevaDescripcion }).subscribe({
      next: (res) => {
        if (res.updated) {
          const idx = this.urls.findIndex(u => u.id_requisito === this.editingId);
          if (idx > -1) {
            this.urls[idx].descripcion = nuevaDescripcion;
          }

          Swal.fire('Actualizado', 'La URL fue actualizada correctamente.', 'success');
          this.cancelarEdicionURL();
        }
      },
      error: (err) => {
        console.error('Error al actualizar la URL:', err);
        Swal.fire('Error', 'Hubo un problema al actualizar la URL.', 'error');
      }
    });
  }
}