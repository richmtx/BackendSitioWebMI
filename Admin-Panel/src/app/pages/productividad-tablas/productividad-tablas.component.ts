import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CuerposAcademicosService } from './cuerpos-academicos.service';
import { SistemaNacionalService } from './sistema-nacional.service';
import { PerfilDeseableService } from './perfil-deseable.service';
import { OtrosReconocimientosService } from './otros-reconocimientos.service';
import { ConveniosFirmadosService } from './convenios-firmados.service';
import { ParticipacionRedesService } from './participacion-redes.service';

@Component({
  selector: 'app-productividad-tablas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productividad-tablas.component.html',
  styleUrls: ['./productividad-tablas.component.css']
})
export class ProductividadTablasComponent implements OnInit {
  // Datos
  cuerposAcademicos: any[] = [];
  sistemaNacional: any[] = [];
  perfilDeseable: any[] = [];
  otrosReconocimientos: any[] = [];
  conveniosFirmados: any[] = [];
  participacionRedes: any[] = [];

  // Variables para formulario nuevo cuerpo
  mostrarFormularioCuerpos = false;
  nuevoNomProy = '';
  nuevosIntegrantes = '';

  // Variables para edición (PUT)
  filaEditando: number | null = null;
  editNomProy = '';
  editIntegrantes = '';

  constructor(
    private cuerposService: CuerposAcademicosService,
    private sistemaService: SistemaNacionalService,
    private perfilService: PerfilDeseableService,
    private otrosService: OtrosReconocimientosService,
    private conveniosService: ConveniosFirmadosService,
    private participacionService: ParticipacionRedesService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  // ===== GET =====
  cargarDatos(): void {
    this.cuerposService.getAll().subscribe(data => (this.cuerposAcademicos = data));
    this.sistemaService.getAll().subscribe(data => (this.sistemaNacional = data));
    this.perfilService.getAll().subscribe(data => (this.perfilDeseable = data));
    this.otrosService.getAll().subscribe(data => (this.otrosReconocimientos = data));
    this.conveniosService.getAll().subscribe(data => (this.conveniosFirmados = data));
    this.participacionService.getAll().subscribe(data => (this.participacionRedes = data));
  }

  // ===== POST =====
  mostrarFormCuerpos(): void {
    this.mostrarFormularioCuerpos = true;
  }

  cancelarNuevoCuerpo(): void {
    this.mostrarFormularioCuerpos = false;
    this.nuevoNomProy = '';
    this.nuevosIntegrantes = '';
  }

  guardarNuevoCuerpo(): void {
    if (!this.nuevoNomProy.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Por favor ingresa el nombre del proyecto.',
        confirmButtonColor: '#007bff'
      });
      return;
    }

    const integrantesArray = this.nuevosIntegrantes
      .split('\n')
      .map(nombre => nombre.trim())
      .filter(nombre => nombre !== '')
      .map(nombre => ({ nombre }));

    const nuevoCuerpo = { nomProy: this.nuevoNomProy, integrantes: integrantesArray };

    this.cuerposService.create(nuevoCuerpo).subscribe({
      next: () => {
        this.cargarDatos();
        this.cancelarNuevoCuerpo();
        Swal.fire({
          icon: 'success',
          title: 'Proyecto guardado correctamente',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al guardar el registro.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  // ====== POST: OTROS RECONOCIMIENTOS ======
  mostrarFormularioReconocimientos = false;
  nuevoProfesor = '';
  nuevoTipoRec = '';

  mostrarFormReconocimientos(): void {
    this.mostrarFormularioReconocimientos = true;
  }

  cancelarNuevoReconocimiento(): void {
    this.mostrarFormularioReconocimientos = false;
    this.nuevoProfesor = '';
    this.nuevoTipoRec = '';
  }

  guardarNuevoReconocimiento(): void {
    if (!this.nuevoProfesor.trim() || !this.nuevoTipoRec.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor ingresa el nombre del profesor y el tipo de reconocimiento.',
        confirmButtonColor: '#007bff'
      });
      return;
    }

    const nuevoReconocimiento = {
      profesor: this.nuevoProfesor,
      tipoRec: this.nuevoTipoRec
    };

    this.otrosService.create(nuevoReconocimiento).subscribe({
      next: () => {
        this.cargarDatos();
        this.cancelarNuevoReconocimiento();

        Swal.fire({
          icon: 'success',
          title: 'Guardado correctamente',
          text: 'El nuevo reconocimiento ha sido agregado.',
          showConfirmButton: true,
          timer: 2000,
          background: '#f9f9f9',
          iconColor: '#28a745'
        });
      },
      error: (err) => {
        console.error('Error al guardar el reconocimiento:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo guardar el reconocimiento.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  // ===== PUT (Editar) =====
  editarCuerpo(cuerpo: any): void {
    this.filaEditando = cuerpo.id_cuerpo;
    this.editNomProy = cuerpo.nomProy;
    this.editIntegrantes = cuerpo.integrantes.map((i: any) => i.nombre).join('\n');
  }

  cancelarEdicion(): void {
    this.filaEditando = null;
    this.editNomProy = '';
    this.editIntegrantes = '';
  }

  guardarEdicion(id: number): void {
    const integrantesArray = this.editIntegrantes
      .split('\n')
      .map(nombre => nombre.trim())
      .filter(nombre => nombre !== '')
      .map(nombre => ({ nombre }));

    const cuerpoEditado = {
      nomProy: this.editNomProy,
      integrantes: integrantesArray
    };

    this.cuerposService.update(id, cuerpoEditado).subscribe({
      next: () => {
        this.cargarDatos();
        this.cancelarEdicion();
        Swal.fire({
          icon: 'success',
          title: 'Proyecto actualizado',
          text: 'Los cambios se han guardado correctamente.',
          showConfirmButton: true,
          timer: 2000,
          background: '#f9f9f9',
          iconColor: '#28a745'
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el proyecto.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  // ===== PUT: SISTEMA NACIONAL =====
  filaEditandoSistema: number | null = null;
  editNumProfesores = 0;
  editNivelC = '';
  editNivel1 = '';

  editarSistema(snii: any): void {
    this.filaEditandoSistema = snii.id_sistema;
    this.editNumProfesores = snii.numProfesores;
    this.editNivelC = snii.nivelC;
    this.editNivel1 = snii.nivel1;
  }

  cancelarEdicionSistema(): void {
    this.filaEditandoSistema = null;
    this.editNumProfesores = 0;
    this.editNivelC = '';
    this.editNivel1 = '';
  }

  guardarEdicionSistema(): void {
    if (this.filaEditandoSistema === null) return;

    const datosActualizados = {
      numProfesores: this.editNumProfesores,
      nivelC: this.editNivelC,
      nivel1: this.editNivel1
    };

    this.sistemaService.update(this.filaEditandoSistema, datosActualizados).subscribe({
      next: () => {
        this.cargarDatos();
        this.cancelarEdicionSistema();

        Swal.fire({
          icon: 'success',
          title: 'Proyecto actualizado',
          text: 'Los cambios se han guardado.',
          showConfirmButton: true,
          timer: 2000,
          background: '#f9f9f9',
          iconColor: '#28a745'
        });
      },
      error: (err) => {
        console.error('Error al actualizar Sistema Nacional:', err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron actualizar los datos.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  // ===== PUT: PERFIL DESEABLE =====
  filaEditandoPerfil: number | null = null;
  editNumProfesoresPerfil = 0;

  editarPerfil(perfil: any): void {
    this.filaEditandoPerfil = perfil.id_perfil;
    this.editNumProfesoresPerfil = perfil.numProfesores;
  }

  cancelarEdicionPerfil(): void {
    this.filaEditandoPerfil = null;
    this.editNumProfesoresPerfil = 0;
  }

  guardarEdicionPerfil(): void {
    if (this.filaEditandoPerfil === null) return;

    const datosActualizados = {
      numProfesores: this.editNumProfesoresPerfil
    };

    this.perfilService.update(this.filaEditandoPerfil, datosActualizados).subscribe({
      next: () => {
        this.cargarDatos();
        this.cancelarEdicionPerfil();

        Swal.fire({
          icon: 'success',
          title: 'Proyecto actualizado',
          text: 'Los cambios se han guardado.',
          showConfirmButton: true,
          timer: 2000,
          background: '#f9f9f9',
          iconColor: '#28a745'
        });
      },
      error: (err) => {
        console.error('Error al actualizar Perfil Deseable:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron actualizar los datos.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  // ====== PUT: OTROS RECONOCIMIENTOS ======
  filaEditandoReconocimiento: number | null = null;
  backupReconocimiento: any = null;
  reconocimientoEditando: any = null;

  editarReconocimiento(id: number): void {
    this.filaEditandoReconocimiento = id;

    const original = this.otrosReconocimientos.find(r => r.id_reconocimientos === id);
    if (original) {
      this.backupReconocimiento = { ...original };
      this.reconocimientoEditando = { ...original };
    }
  }

  cancelarEdicionReconocimiento(): void {
    if (this.backupReconocimiento) {
      const index = this.otrosReconocimientos.findIndex(
        r => r.id_reconocimientos === this.backupReconocimiento.id_reconocimientos
      );
      if (index !== -1) {
        this.otrosReconocimientos[index] = { ...this.backupReconocimiento };
      }
    }

    this.filaEditandoReconocimiento = null;
    this.backupReconocimiento = null;
    this.reconocimientoEditando = null;
  }

  guardarEdicionReconocimiento(rec: any): void {
    if (!this.reconocimientoEditando.profesor.trim() || !this.reconocimientoEditando.tipoRec.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa ambos campos antes de guardar.',
        confirmButtonColor: '#007bff'
      });
      return;
    }

    const reconocimientoEditado = {
      profesor: this.reconocimientoEditando.profesor,
      tipoRec: this.reconocimientoEditando.tipoRec
    };

    this.otrosService.update(Number(rec.id_reconocimientos), reconocimientoEditado).subscribe({
      next: () => {
        this.cargarDatos();
        this.cancelarEdicionReconocimiento();

        Swal.fire({
          icon: 'success',
          title: 'Actualizado correctamente',
          text: 'Los cambios se han guardado.',
          showConfirmButton: true,
          timer: 2000,
          background: '#f9f9f9',
          iconColor: '#28a745'
        });
      },
      error: (err) => {
        console.error('Error al actualizar el reconocimiento:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el reconocimiento.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  // ===== DELETE (Eliminar) =====
  eliminarCuerpo(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proyecto se eliminará permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuerposService.delete(id).subscribe({
          next: () => {
            this.cargarDatos();
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El proyecto ha sido eliminado correctamente.',
              showConfirmButton: true,
              timer: 2000,
              background: '#f9f9f9',
              iconColor: '#28a745'
            });
          },
          error: (err) => {
            console.error('Error al eliminar el proyecto:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el proyecto.',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  // ====== DELETE: OTROS RECONOCIMIENTOS ======
  eliminarReconocimiento(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el reconocimiento de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#f9f9f9'
    }).then((result) => {
      if (result.isConfirmed) {
        this.otrosService.delete(id).subscribe({
          next: () => {
            this.cargarDatos();
            Swal.fire({
              icon: 'success',
              title: 'Eliminado correctamente',
              text: 'El reconocimiento ha sido eliminado.',
              showConfirmButton: true,
              timer: 2000,
              background: '#f9f9f9',
              iconColor: '#28a745'
            });
          },
          error: (err) => {
            console.error('Error al eliminar reconocimiento:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el reconocimiento.',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      }
    });
  }
}
