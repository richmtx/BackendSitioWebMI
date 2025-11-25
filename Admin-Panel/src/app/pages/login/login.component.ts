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
    this.loginService.login(this.correo, this.contrasena).subscribe({
      next: (res) => {
        if (res.ok) {
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          this.router.navigate(['/panel']);
        } else {
          this.error = 'Credenciales incorrectas';
        }
      },
      error: () => {
        this.error = 'Error en el servidor';
      }
    });
  }
}
