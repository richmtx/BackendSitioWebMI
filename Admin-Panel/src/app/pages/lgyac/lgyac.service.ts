import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface Lgyac {
  id_lgyac: number;
  nombre: string;
  objetivos: string;
}

@Injectable({
  providedIn: 'root'
})
export class LgyacService {

  // URL global
  private baseUrl = `${URL_SERVER}/lgyac`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Lgyac[]> {
    return this.http.get<Lgyac[]>(this.baseUrl);
  }

  create(lgyac: { nombre: string; objetivos: string }): Observable<Lgyac> {
    return this.http.post<Lgyac>(this.baseUrl, lgyac);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  update(id: number, lgyac: Partial<Lgyac>): Observable<Lgyac> {
    return this.http.put<Lgyac>(`${this.baseUrl}/${id}`, lgyac);
  }
}
