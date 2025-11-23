import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface DistribucionAsignatura {
  id_asignatura: number;
  materia: string;
  creditos: number;
}

@Injectable({
  providedIn: 'root'
})
export class DistribucionAsignaturasService {

  // URL global
  private apiUrl = `${URL_SERVER}/distribucion-asignaturas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<DistribucionAsignatura[]> {
    return this.http.get<DistribucionAsignatura[]>(this.apiUrl);
  }

  create(data: Partial<DistribucionAsignatura>): Observable<DistribucionAsignatura> {
    return this.http.post<DistribucionAsignatura>(this.apiUrl, data);
  }

  update(id: number, data: Partial<DistribucionAsignatura>): Observable<DistribucionAsignatura> {
    return this.http.put<DistribucionAsignatura>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.apiUrl}/${id}`);
  }
}
