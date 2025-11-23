import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface OrientacionProfesional {
  id_orientacion: number;
  materia: string;
  creditos: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrientacionProfesionalService {

  // URL Global
  private apiUrl = `${URL_SERVER}/orientacion-profesional`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<OrientacionProfesional[]> {
    return this.http.get<OrientacionProfesional[]>(this.apiUrl);
  }

  create(data: Partial<OrientacionProfesional>): Observable<OrientacionProfesional> {
    return this.http.post<OrientacionProfesional>(this.apiUrl, data);
  }

  update(id: number, data: Partial<OrientacionProfesional>): Observable<OrientacionProfesional> {
    return this.http.put<OrientacionProfesional>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.apiUrl}/${id}`);
  }
}
