import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cohorte {
  id_cohorte: number;
  titulo: string;
  imagen?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CohorteGenService {

  private apiUrl = 'http://localhost:3000/cohorte';

  constructor(private http: HttpClient) {}

  getCohortes(): Observable<Cohorte[]> {
    return this.http.get<Cohorte[]>(this.apiUrl);
  }

  getCohorteById(id: number): Observable<Cohorte> {
    return this.http.get<Cohorte>(`${this.apiUrl}/${id}`);
  }

  createCohorte(data: any): Observable<Cohorte> {
    const formData = new FormData();

    formData.append('titulo', data.titulo);

    if (data.imagen) {
      formData.append('imagen', data.imagen);
    }

    return this.http.post<Cohorte>(this.apiUrl, formData);
  }

  updateCohorte(id: number, data: any): Observable<Cohorte> {
    const formData = new FormData();

    formData.append('titulo', data.titulo);

    if (data.imagen) {
      formData.append('imagen', data.imagen);
    }

    return this.http.put<Cohorte>(`${this.apiUrl}/${id}`, formData);
  }

  deleteCohorte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
