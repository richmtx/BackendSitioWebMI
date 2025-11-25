import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  correo: string = '';
  contrasena: string = '';
  error: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  iniciarSesion() {
    this.error = '';

    this.loginService.login(this.correo, this.contrasena).subscribe({
      next: (res) => {
        if (res.ok && res.accessToken && res.refreshToken) {
          this.loginService.guardarSesion(res);
          this.router.navigate(['/panel']);
        } else {
          this.error = res.mensaje || 'Credenciales incorrectas';
        }
      },
      error: () => {
        this.error = 'Error en el servidor';
      }
    });
  }
}
