import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LgacArticulo3 {
  id_articulo: number;
  titulo: string;
  descripcion: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgacArticulos3Service {

  private apiUrl = 'http://localhost:3000/lgac-articulos3';

  constructor(private http: HttpClient) {}

  getArticulos(): Observable<LgacArticulo3[]> {
    return this.http.get<LgacArticulo3[]>(this.apiUrl);
  }

  getArticulo(id: number): Observable<LgacArticulo3> {
    return this.http.get<LgacArticulo3>(`${this.apiUrl}/${id}`);
  }

  crearArticulo(data: Partial<LgacArticulo3>): Observable<LgacArticulo3> {
    return this.http.post<LgacArticulo3>(this.apiUrl, data);
  }

  actualizarArticulo(id: number, data: Partial<LgacArticulo3>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarArticulo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
