import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LgacCapitulo3 {
  id_capitulo: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacCapitulos3Service {

  private apiUrl = 'http://localhost:3000/lgac-capitulos3';

  constructor(private http: HttpClient) {}

  getCapitulos(): Observable<LgacCapitulo3[]> {
    return this.http.get<LgacCapitulo3[]>(this.apiUrl);
  }

  getCapitulo(id: number): Observable<LgacCapitulo3> {
    return this.http.get<LgacCapitulo3>(`${this.apiUrl}/${id}`);
  }

  crearCapitulo(data: Partial<LgacCapitulo3>): Observable<LgacCapitulo3> {
    return this.http.post<LgacCapitulo3>(this.apiUrl, data);
  }

  actualizarCapitulo(id: number, data: Partial<LgacCapitulo3>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarCapitulo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
