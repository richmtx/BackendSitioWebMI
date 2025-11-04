import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/requisitos-grado';

export interface RequisitoGrado {
  id_grado: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequisitosGradoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<RequisitoGrado[]> {
    return this.http.get<RequisitoGrado[]>(API_URL);
  }

  create(requisito: Partial<RequisitoGrado>): Observable<RequisitoGrado> {
    return this.http.post<RequisitoGrado>(API_URL, requisito);
  }

  update(id_grado: number, requisito: Partial<RequisitoGrado>): Observable<RequisitoGrado> {
    return this.http.put<RequisitoGrado>(`${API_URL}/${id_grado}`, requisito);
  }

  delete(id_grado: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${API_URL}/${id_grado}`);
  }
}
