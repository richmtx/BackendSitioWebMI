import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface MapaCurricular {
  id: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapaCurricularService {

  // URL Global  
  private apiUrl = `${URL_SERVER}/mapa-curricular`;

  constructor(private http: HttpClient) { }

  obtenerMapa(): Observable<MapaCurricular> {
    return this.http.get<MapaCurricular>(this.apiUrl);
  }

  actualizarMapa(id: number, url: string): Observable<MapaCurricular> {
    return this.http.put<MapaCurricular>(`${this.apiUrl}/${id}`, { url });
  }
}
