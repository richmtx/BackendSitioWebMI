import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carrusel {
  id_carrusel: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarruselService {
  private apiUrl = 'http://localhost:3000/carrusel';

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
