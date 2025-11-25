import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { URL_SERVER } from '../../config/server.config';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {

  mostrarModal = false;

  nuevoCorreo: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';

  cargando = false;

  // URL GLOBAL
  private apiUrl = `${URL_SERVER}/usuarios`;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  // =====================================================
  // LOGOUT
  // =====================================================
  logout() {
    const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (!confirmar) return;

    localStorage.removeItem('usuario');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    alert("Sesión cerrada correctamente");
    this.router.navigate(['/login']);
  }

  // =====================================================
  // MODAL CAMBIAR USUARIO
  // =====================================================
  abrirModalCambiarUsuario() {
    const usuarioStr = localStorage.getItem('usuario');

    if (!usuarioStr) {
      alert('No hay usuario cargado en sesión.');
      return;
    }

    this.nuevoCorreo = '';
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';

    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cargando = false;
  }

  // =====================================================
  // GUARDAR CAMBIOS
  // =====================================================
  guardarCambiosUsuario() {

    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      alert('No hay usuario en sesión.');
      return;
    }

    const usuario = JSON.parse(usuarioStr);
    const idUsuario = usuario.id_usuario;

    if (!idUsuario) {
      alert('No se encontró el ID del usuario.');
      return;
    }

    if (!this.nuevoCorreo || !this.nuevaContrasena || !this.confirmarContrasena) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    this.cargando = true;

    const body = {
      correo: this.nuevoCorreo,
      contraseña: this.nuevaContrasena
    };

    this.http.put(`${this.apiUrl}/${idUsuario}`, body).subscribe({
      next: () => {
        const usuarioActualizado = {
          ...usuario,
          correo: this.nuevoCorreo
        };

        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));

        alert('Usuario actualizado correctamente.');
        this.cerrarModal();
      },
      error: () => {
        this.cargando = false;
        alert('Error al actualizar el usuario.');
      }
    });
  }
}
