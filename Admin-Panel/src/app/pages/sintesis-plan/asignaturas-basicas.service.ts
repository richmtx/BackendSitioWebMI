import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AsignaturaBasica {
  id_asignatura: number;
  materia: string;
  creditos: number;
}

@Injectable({
  providedIn: 'root'
})
export class AsignaturasBasicasService {
  private apiUrl = 'http://localhost:3000/asignaturas-basicas'; // tu endpoint NestJS

  constructor(private http: HttpClient) {}

  getAll(): Observable<AsignaturaBasica[]> {
    return this.http.get<AsignaturaBasica[]>(this.apiUrl);
  }
}
