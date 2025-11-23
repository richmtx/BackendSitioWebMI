import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface RequisitoIngreso {
  id_requisito: number;
  categoria: 'antecedentes' | 'requisitos' | 'seleccion' | 'URLs';
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequisitosIngresoService {

  // URL global
  private apiUrl = `${URL_SERVER}/requisitos-ingreso`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<RequisitoIngreso[]> {
    return this.http.get<RequisitoIngreso[]>(this.apiUrl);
  }

  getByCategoria(categoria: string): Observable<RequisitoIngreso[]> {
    return this.http.get<RequisitoIngreso[]>(`${this.apiUrl}/categoria/${categoria}`);
  }

  create(data: { categoria: string; descripcion: string }) {
    return this.http.post<RequisitoIngreso>(this.apiUrl, data);
  }

  update(id: number, data: Partial<Pick<RequisitoIngreso, 'categoria' | 'descripcion'>>) {
    return this.http.put<{ updated: boolean }>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<{ deleted: boolean }>(`${this.apiUrl}/${id}`);
  }
}
