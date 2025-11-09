import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Galeria {
  id_galeria: number;
  titulo: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {
  private apiUrl = `http://localhost:3000/galeria`; 

  constructor(private http: HttpClient) {}

  getAllGaleria(): Observable<Galeria[]> {
    return this.http.get<Galeria[]>(this.apiUrl);
  }

  getGaleriaById(id_galeria: number): Observable<Galeria> {
    return this.http.get<Galeria>(`${this.apiUrl}/${id_galeria}`);
  }

  createGaleria(galeriaData: Partial<Galeria>): Observable<Galeria> {
    return this.http.post<Galeria>(this.apiUrl, galeriaData);
  }

  updateGaleria(id_galeria: number, galeriaData: Partial<Galeria>): Observable<Galeria> {
    return this.http.put<Galeria>(`${this.apiUrl}/${id_galeria}`, galeriaData);
  }

  deleteGaleria(id_galeria: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id_galeria}`);
  }
}
