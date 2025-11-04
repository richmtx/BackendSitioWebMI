import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequisitoPermanencia {
  id_requisito: number;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequisitosPermanenciaService {
  private apiUrl = 'http://localhost:3000/requisitos-permanencia';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RequisitoPermanencia[]> {
    return this.http.get<RequisitoPermanencia[]>(this.apiUrl);
  }

  crearRequisito(descripcion: string): Observable<RequisitoPermanencia> {
    return this.http.post<RequisitoPermanencia>(this.apiUrl, { descripcion });
  }

  actualizarRequisito(id_requisito: number, descripcion: string): Observable<{ updated: boolean }> {
    return this.http.put<{ updated: boolean }>(`${this.apiUrl}/${id_requisito}`, { descripcion });
  }

  eliminarRequisito(id_requisito: number): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.apiUrl}/${id_requisito}`);
  }
}
