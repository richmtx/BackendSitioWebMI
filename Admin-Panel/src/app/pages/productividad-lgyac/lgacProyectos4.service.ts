import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LgacProyecto4 {
  id_proyecto: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacProyectos4Service {

  private apiUrl = 'http://localhost:3000/lgac-proyectos4';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<LgacProyecto4[]> {
    return this.http.get<LgacProyecto4[]>(this.apiUrl);
  }

  getProyecto(id: number): Observable<LgacProyecto4> {
    return this.http.get<LgacProyecto4>(`${this.apiUrl}/${id}`);
  }

  crearProyecto(data: Partial<LgacProyecto4>): Observable<LgacProyecto4> {
    return this.http.post<LgacProyecto4>(this.apiUrl, data);
  }

  actualizarProyecto(id: number, data: Partial<LgacProyecto4>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarProyecto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
