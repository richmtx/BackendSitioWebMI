import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface LgacCapitulo2 {
  id_capitulo: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacCapitulos2Service {

  // URL Global
  private apiUrl = `${URL_SERVER}/lgac-capitulos2`;

  constructor(private http: HttpClient) {}

  getCapitulos(): Observable<LgacCapitulo2[]> {
    return this.http.get<LgacCapitulo2[]>(this.apiUrl);
  }

  getCapitulo(id: number): Observable<LgacCapitulo2> {
    return this.http.get<LgacCapitulo2>(`${this.apiUrl}/${id}`);
  }

  crearCapitulo(data: Partial<LgacCapitulo2>): Observable<LgacCapitulo2> {
    return this.http.post<LgacCapitulo2>(this.apiUrl, data);
  }

  actualizarCapitulo(id: number, data: Partial<LgacCapitulo2>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarCapitulo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
