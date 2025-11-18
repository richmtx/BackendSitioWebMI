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
}
