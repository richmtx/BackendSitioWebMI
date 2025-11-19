import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NucleoBasicoService, NucleoBasico } from './nucleo-basico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nucleo-basico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nucleo-basico.component.html',
  styleUrl: './nucleo-basico.component.css'
})
export class NucleoBasicoComponent implements OnInit {

  nucleoBasico: NucleoBasico[] = [];
  ocultos: boolean[] = [];

  formVisible = false;
  imagenSeleccionada: File | null = null;
  previewImagen: string | null = null;

  profesorEditandoId: number | null = null;
  imagenActual: string | null = null;

  nuevoProfesor = {
    nombre: '',
    grado_maximo: '',
    especialidad: '',
    cedula_profesional: '',
    nivel_snii: '',
    cargo: '',
    unidad_adscripcion: '',
    correo: '',
    semblanza: '',
    lineas_investigacion: '',
    cvu_enlaces: [
      { id: 0, enlace: '' }
    ]
  };

  constructor(private nucleoBasicoService: NucleoBasicoService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  validarProfesor(): boolean {
    if (!this.nuevoProfesor.nombre.trim()) return false;
    if (!this.nuevoProfesor.grado_maximo.trim()) return false;
    if (!this.nuevoProfesor.especialidad.trim()) return false;
    if (!this.nuevoProfesor.cedula_profesional.trim()) return false;
    if (!this.nuevoProfesor.nivel_snii.trim()) return false;
    if (!this.nuevoProfesor.cargo.trim()) return false;
    if (!this.nuevoProfesor.unidad_adscripcion.trim()) return false;
    if (!this.nuevoProfesor.correo.trim()) return false;
    if (!this.nuevoProfesor.semblanza.trim()) return false;
    if (!this.nuevoProfesor.lineas_investigacion.trim()) return false;

    return true;
  }

  cargarDatos(): void {
    this.nucleoBasicoService.getNucleoBasico().subscribe({
      next: (data) => {
        this.nucleoBasico = data;
        this.ocultos = Array(this.nucleoBasico.length).fill(true);
      },
      error: (err) => console.error("Error al cargar núcleo básico:", err)
    });
  }

  toggleDetalles(i: number) {
    this.ocultos[i] = !this.ocultos[i];
  }

  toggleFormulario() {
    this.formVisible = !this.formVisible;
  }

  cancelarFormulario() {
    this.formVisible = false;
    this.previewImagen = null;
    this.imagenSeleccionada = null;

    this.nuevoProfesor = {
      nombre: '',
      grado_maximo: '',
      especialidad: '',
      cedula_profesional: '',
      nivel_snii: '',
      cargo: '',
      unidad_adscripcion: '',
      correo: '',
      semblanza: '',
      lineas_investigacion: '',
      cvu_enlaces: [
        { id: 0, enlace: '' }
      ]
    };
  }

  onSeleccionarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;

      const reader = new FileReader();
      reader.onload = () => this.previewImagen = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  guardarProfesor() {
    if (!this.validarProfesor()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor llena todos los campos obligatorios antes de guardar.',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#7066e0'
      });
      return;
    }

    this.nucleoBasicoService.crearNucleoBasico(this.nuevoProfesor, this.imagenSeleccionada!)
      .subscribe({
        next: () => {

          Swal.fire({
            icon: 'success',
            title: '¡Profesor registrado!',
            text: 'El profesor se ha guardado correctamente.',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#7066e0'
          });

          this.cancelarFormulario();
          this.cargarDatos();
        },
        error: (err) => {
          console.error('Error al guardar profesor:', err);

          Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: 'Ocurrió un problema al registrar el profesor.',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#d33'
          });
        }
      });
  }

  agregarCvu() {
    this.nuevoProfesor.cvu_enlaces.push({ id: 0, enlace: '' });
  }

  profesorOriginal: any = null;

  editarProfesor(prof: NucleoBasico) {
    this.profesorEditandoId = prof.id!;
    this.formVisible = false;

    this.nuevoProfesor = {
      nombre: prof.nombre,
      grado_maximo: prof.grado_maximo,
      especialidad: prof.especialidad,
      cedula_profesional: prof.cedula_profesional,
      nivel_snii: prof.nivel_snii,
      cargo: prof.cargo,
      unidad_adscripcion: prof.unidad_adscripcion,
      correo: prof.correo,
      semblanza: prof.semblanza,
      lineas_investigacion: prof.lineas_investigacion,
      cvu_enlaces: JSON.parse(JSON.stringify(prof.cvu_enlaces))
    };

    this.profesorOriginal = JSON.parse(JSON.stringify(this.nuevoProfesor));

    this.previewImagen = null;
    this.imagenSeleccionada = null;

    this.imagenActual = prof.imagen
      ? `http://localhost:3000/${prof.imagen}`
      : 'assets/sin-foto.png';
  }

  guardarEdicion() {
    if (!this.profesorEditandoId) return;

    if (!this.validarProfesor()) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor llena todos los campos obligatorios.",
        confirmButtonColor: "#7066e0"
      });
      return;
    }

    this.nuevoProfesor.cvu_enlaces = this.nuevoProfesor.cvu_enlaces.filter(
      (cvu) => cvu.enlace.trim() !== ""
    );

    const sinCambios =
      JSON.stringify(this.nuevoProfesor) === JSON.stringify(this.profesorOriginal) &&
      !this.imagenSeleccionada;

    if (sinCambios) {
      Swal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "No se detectaron modificaciones para guardar.",
        confirmButtonColor: "#7066e0"
      });
      return;
    }

    this.nucleoBasicoService.actualizarNucleoBasico(
      this.profesorEditandoId,
      this.nuevoProfesor,
      this.imagenSeleccionada || undefined
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "¡Profesor actualizado!",
          text: "Los datos se actualizaron correctamente.",
          confirmButtonColor: "#7066e0"
        });

        this.cancelarEdicion();
        this.cargarDatos();
      },
      error: (err) => {
        console.error("Error al actualizar:", err);

        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: "Ocurrió un problema al modificar el profesor.",
          confirmButtonColor: "#d33"
        });
      }
    });
  }

  cancelarEdicion() {
    this.profesorEditandoId = null;
    this.previewImagen = null;
    this.imagenActual = null;
    this.imagenSeleccionada = null;

    this.nuevoProfesor = {
      nombre: '',
      grado_maximo: '',
      especialidad: '',
      cedula_profesional: '',
      nivel_snii: '',
      cargo: '',
      unidad_adscripcion: '',
      correo: '',
      semblanza: '',
      lineas_investigacion: '',
      cvu_enlaces: [
        { id: 0, enlace: '' }
      ]
    };
  }

  eliminarProfesor(prof: NucleoBasico) {
    Swal.fire({
      title: '¿Eliminar profesor?',
      text: `Esta acción eliminará a "${prof.nombre}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.nucleoBasicoService.eliminarNucleoBasico(prof.id!).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Profesor eliminado',
              text: `El profesor "${prof.nombre}" ha sido eliminado correctamente.`,
              confirmButtonColor: '#7066e0'
            });
            this.cargarDatos();
          },
          error: (err) => {
            console.error('Error al eliminar:', err);

            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'Ocurrió un problema al intentar eliminar al profesor.',
              confirmButtonColor: '#d33'
            });
          }
        });
      }
    });
  }
}
