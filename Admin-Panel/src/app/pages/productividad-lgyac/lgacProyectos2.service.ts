import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LgacProyecto2 {
  id_proyecto: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacProyectos2Service {

  private apiUrl = 'http://localhost:3000/lgac-proyectos2';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<LgacProyecto2[]> {
    return this.http.get<LgacProyecto2[]>(this.apiUrl);
  }

  getProyecto(id: number): Observable<LgacProyecto2> {
    return this.http.get<LgacProyecto2>(`${this.apiUrl}/${id}`);
  }

  crearProyecto(data: Partial<LgacProyecto2>): Observable<LgacProyecto2> {
    return this.http.post<LgacProyecto2>(this.apiUrl, data);
  }

  actualizarProyecto(id: number, data: Partial<LgacProyecto2>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarProyecto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
