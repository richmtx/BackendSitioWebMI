import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AsignaturaOptativa {
  id_optativas: number;
  materia: string;
  creditos: number;
}

@Injectable({
  providedIn: 'root'
})
export class AsignaturasOptativasService {
  private apiUrl = 'http://localhost:3000/asignaturas-optativas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<AsignaturaOptativa[]> {
    return this.http.get<AsignaturaOptativa[]>(this.apiUrl);
  }

  create(data: Partial<AsignaturaOptativa>): Observable<AsignaturaOptativa> {
    return this.http.post<AsignaturaOptativa>(this.apiUrl, data);
  }

  update(id: number, data: Partial<AsignaturaOptativa>): Observable<AsignaturaOptativa> {
    return this.http.put<AsignaturaOptativa>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.apiUrl}/${id}`);
  }
}
