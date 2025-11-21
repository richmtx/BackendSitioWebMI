import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LgacProyecto {
  id_proyecto: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacProyectosService {

  private apiUrl = 'http://localhost:3000/lgac-proyectos';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<LgacProyecto[]> {
    return this.http.get<LgacProyecto[]>(this.apiUrl);
  }

  getProyecto(id: number): Observable<LgacProyecto> {
    return this.http.get<LgacProyecto>(`${this.apiUrl}/${id}`);
  }

  crearProyecto(data: Partial<LgacProyecto>): Observable<LgacProyecto> {
    return this.http.post<LgacProyecto>(this.apiUrl, data);
  }

  actualizarProyecto(id: number, data: Partial<LgacProyecto>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarProyecto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
