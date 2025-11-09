import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private apiUrl = `http://localhost:3000/eventos`; 

  constructor(private http: HttpClient) {}

  // ======= GET: Obtener todos los eventos =======
  getAllEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // (Dejamos preparados los demás métodos para cuando lleguemos al CRUD completo)
  // ======= POST: Crear nuevo evento =======
  createEvento(eventoData: Partial<Evento>): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, eventoData);
  }

  // ======= PUT: Actualizar evento =======
  updateEvento(id_evento: number, eventoData: Partial<Evento>): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id_evento}`, eventoData);
  }

  // ======= DELETE: Eliminar evento =======
  deleteEvento(id_evento: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_evento}`);
  }
}
