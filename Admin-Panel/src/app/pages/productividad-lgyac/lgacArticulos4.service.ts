import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface LgacArticulo4 {
  id_articulo: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacArticulos4Service {

  // URL Global
  private apiUrl = `${URL_SERVER}/lgac-articulos4`;

  constructor(private http: HttpClient) {}

  getArticulos(): Observable<LgacArticulo4[]> {
    return this.http.get<LgacArticulo4[]>(this.apiUrl);
  }

  getArticulo(id: number): Observable<LgacArticulo4> {
    return this.http.get<LgacArticulo4>(`${this.apiUrl}/${id}`);
  }

  crearArticulo(data: Partial<LgacArticulo4>): Observable<LgacArticulo4> {
    return this.http.post<LgacArticulo4>(this.apiUrl, data);
  }

  actualizarArticulo(id: number, data: Partial<LgacArticulo4>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarArticulo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
