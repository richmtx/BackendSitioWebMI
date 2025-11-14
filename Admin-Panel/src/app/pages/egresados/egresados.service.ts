import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EgresadosService {

  private apiUrl = 'http://localhost:3000/egresados';

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
