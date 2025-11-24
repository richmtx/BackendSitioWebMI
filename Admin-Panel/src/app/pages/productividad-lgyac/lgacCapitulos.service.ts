import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface LgacCapitulo {
  id_capitulo: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacCapitulosService {

  // URL Global
  private apiUrl = `${URL_SERVER}/lgac-capitulos`;

  constructor(private http: HttpClient) {}

  getCapitulos(): Observable<LgacCapitulo[]> {
    return this.http.get<LgacCapitulo[]>(this.apiUrl);
  }

  getCapitulo(id: number): Observable<LgacCapitulo> {
    return this.http.get<LgacCapitulo>(`${this.apiUrl}/${id}`);
  }

  crearCapitulo(data: Partial<LgacCapitulo>): Observable<LgacCapitulo> {
    return this.http.post<LgacCapitulo>(this.apiUrl, data);
  }

  actualizarCapitulo(id: number, data: Partial<LgacCapitulo>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarCapitulo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
