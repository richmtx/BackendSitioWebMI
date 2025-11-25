import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    alert("Sesión cerrada correctamente");

    this.router.navigate(['/login']);
  }
}
