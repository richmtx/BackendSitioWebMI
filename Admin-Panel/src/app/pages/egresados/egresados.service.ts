import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

@Injectable({
  providedIn: 'root'
})
export class EgresadosService {

  // Uso de la URL global
  private apiUrl = `${URL_SERVER}/egresados`;

  constructor(private http: HttpClient) {}

  getEgresados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEgresadoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateEgresado(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }
}
