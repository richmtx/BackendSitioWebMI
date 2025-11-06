import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/cuerpos-academicos';

@Injectable({
  providedIn: 'root'
})
export class CuerposAcademicosService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(API_URL, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/${id}`);
  }
}
