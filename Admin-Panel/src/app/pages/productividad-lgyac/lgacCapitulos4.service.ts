import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface LgacCapitulo4 {
  id_capitulo: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacCapitulos4Service {

  // URL Global
  private apiUrl = `${URL_SERVER}/lgac-capitulos4`;

  constructor(private http: HttpClient) {}

  getCapitulos(): Observable<LgacCapitulo4[]> {
    return this.http.get<LgacCapitulo4[]>(this.apiUrl);
  }

  getCapitulo(id: number): Observable<LgacCapitulo4> {
    return this.http.get<LgacCapitulo4>(`${this.apiUrl}/${id}`);
  }

  crearCapitulo(data: Partial<LgacCapitulo4>): Observable<LgacCapitulo4> {
    return this.http.post<LgacCapitulo4>(this.apiUrl, data);
  }

  actualizarCapitulo(id: number, data: Partial<LgacCapitulo4>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarCapitulo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
