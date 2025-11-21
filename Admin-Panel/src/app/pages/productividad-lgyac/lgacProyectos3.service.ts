import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LgacProyecto3 {
  id_proyecto: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacProyectos3Service {

  private apiUrl = 'http://localhost:3000/lgac-proyectos3';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<LgacProyecto3[]> {
    return this.http.get<LgacProyecto3[]>(this.apiUrl);
  }

  getProyecto(id: number): Observable<LgacProyecto3> {
    return this.http.get<LgacProyecto3>(`${this.apiUrl}/${id}`);
  }

  crearProyecto(data: Partial<LgacProyecto3>): Observable<LgacProyecto3> {
    return this.http.post<LgacProyecto3>(this.apiUrl, data);
  }

  actualizarProyecto(id: number, data: Partial<LgacProyecto3>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarProyecto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
