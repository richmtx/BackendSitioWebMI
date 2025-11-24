import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface LgacArticulo2 {
  id_articulo: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacArticulos2Service {

  // URL global
  private apiUrl = `${URL_SERVER}/lgac-articulos2`;

  constructor(private http: HttpClient) {}

  getArticulos(): Observable<LgacArticulo2[]> {
    return this.http.get<LgacArticulo2[]>(this.apiUrl);
  }

  getArticulo(id: number): Observable<LgacArticulo2> {
    return this.http.get<LgacArticulo2>(`${this.apiUrl}/${id}`);
  }

  crearArticulo(data: Partial<LgacArticulo2>): Observable<LgacArticulo2> {
    return this.http.post<LgacArticulo2>(this.apiUrl, data);
  }

  actualizarArticulo(id: number, data: Partial<LgacArticulo2>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarArticulo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
