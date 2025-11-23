import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface Portada {
  id_portada: number;
  titulo: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortadaService {

  // Uso de la URL global
  private apiUrl = `${URL_SERVER}/portada`;

  constructor(private http: HttpClient) { }

  getAllPortadas(): Observable<Portada[]> {
    return this.http.get<Portada[]>(this.apiUrl);
  }

  updatePortada(id_portada: number, portadaData: FormData): Observable<Portada> {
    return this.http.put<Portada>(`${this.apiUrl}/${id_portada}`, portadaData);
  }
}
