import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface RequisitoGrado {
  id_grado: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequisitosGradoService {

  // URL global
  private apiUrl = `${URL_SERVER}/requisitos-grado`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<RequisitoGrado[]> {
    return this.http.get<RequisitoGrado[]>(this.apiUrl);
  }

  create(requisito: Partial<RequisitoGrado>): Observable<RequisitoGrado> {
    return this.http.post<RequisitoGrado>(this.apiUrl, requisito);
  }

  update(id_grado: number, requisito: Partial<RequisitoGrado>): Observable<RequisitoGrado> {
    return this.http.put<RequisitoGrado>(`${this.apiUrl}/${id_grado}`, requisito);
  }

  delete(id_grado: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.apiUrl}/${id_grado}`);
  }
}
