import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface AsignaturaBasica {
  id_asignatura: number;
  materia: string;
  creditos: number;
}

@Injectable({
  providedIn: 'root'
})
export class AsignaturasBasicasService {

  // URL global
  private apiUrl = `${URL_SERVER}/asignaturas-basicas`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<AsignaturaBasica[]> {
    return this.http.get<AsignaturaBasica[]>(this.apiUrl);
  }

  create(data: Partial<AsignaturaBasica>): Observable<AsignaturaBasica> {
    return this.http.post<AsignaturaBasica>(this.apiUrl, data);
  }

  update(id: number, data: Partial<AsignaturaBasica>): Observable<AsignaturaBasica> {
    return this.http.put<AsignaturaBasica>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.apiUrl}/${id}`);
  }
}
