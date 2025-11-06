import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/perfil-deseable';

@Injectable({
  providedIn: 'root'
})
export class PerfilDeseableService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${id}`, data);
  }
}
