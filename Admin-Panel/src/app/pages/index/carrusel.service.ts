import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface Carrusel {
  id_carrusel: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarruselService {

  // Uso de la URL global
  private apiUrl = `${URL_SERVER}/carrusel`;

  constructor(private http: HttpClient) {}

  getCarrusel(): Observable<Carrusel[]> {
    return this.http.get<Carrusel[]>(this.apiUrl);
  }

  updateCarrusel(id: number, imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', imagen);

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }
}
