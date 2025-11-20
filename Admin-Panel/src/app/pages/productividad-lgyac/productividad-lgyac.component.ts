import { Component, OnInit } from '@angular/core';
import { LgacArticulosService, LgacArticulo } from './lgacArticulos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productividad-lgyac',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productividad-lgyac.component.html',
  styleUrls: ['./productividad-lgyac.component.css'],
})
export class ProductividadLgyacComponent implements OnInit {

  articulos: LgacArticulo[] = [];

  constructor(private lgacService: LgacArticulosService) { }

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.lgacService.getArticulos().subscribe({
      next: (data) => {
        this.articulos = data;
      },
      error: (err) => {
        console.error('Error al obtener artículos:', err);
      }
    });
  }

  abrirArticulo(url: string): void {
    console.log('URL del artículo:', url); // te mostrará la URL correcta
    if (!url) return;

    window.open(url, '_blank');
  }
}
