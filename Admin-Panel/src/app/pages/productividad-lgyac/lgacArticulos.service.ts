import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LgacArticulo {
  id_articulo: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacArticulosService {

  private apiUrl = 'http://localhost:3000/lgac-articulos';

  constructor(private http: HttpClient) {}

  getArticulos(): Observable<LgacArticulo[]> {
    return this.http.get<LgacArticulo[]>(this.apiUrl);
  }

  getArticulo(id: number): Observable<LgacArticulo> {
    return this.http.get<LgacArticulo>(`${this.apiUrl}/${id}`);
  }

  crearArticulo(data: Partial<LgacArticulo>): Observable<LgacArticulo> {
    return this.http.post<LgacArticulo>(this.apiUrl, data);
  }

  actualizarArticulo(id: number, data: Partial<LgacArticulo>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarArticulo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
