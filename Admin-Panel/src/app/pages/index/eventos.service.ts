import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface Evento {
  id_evento: number;
  fecha: string;
  titulo: string;
  lugar: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  // URL global
  private apiUrl = `${URL_SERVER}/eventos`;

  constructor(private http: HttpClient) {}

  getAllEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  createEvento(eventoData: Partial<Evento>): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, eventoData);
  }

  updateEvento(id_evento: number, eventoData: Partial<Evento>): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id_evento}`, eventoData);
  }

  deleteEvento(id_evento: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_evento}`);
  }
}
