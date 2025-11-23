import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface CvuEnlace {
  id: number;
  enlace: string;
}

export interface NucleoBasico {
  id?: number;

  nombre: string;
  especialidad: string;

  grado_maximo: string;
  cedula_profesional: string;
  nivel_snii: string;
  cargo: string;
  unidad_adscripcion: string;
  correo: string;
  semblanza: string;
  lineas_investigacion: string;

  imagen?: string;

  cvu_enlaces: CvuEnlace[];
}

@Injectable({
  providedIn: 'root'
})
export class NucleoBasicoService {

  // URL GLOBAL
  private apiUrl = `${URL_SERVER}/nucleo-basico`;

  constructor(private http: HttpClient) {}

  // ========================================================
  // GET
  // ========================================================
  getNucleoBasico(): Observable<NucleoBasico[]> {
    return this.http.get<NucleoBasico[]>(this.apiUrl);
  }

  // ========================================================
  // POST - Crear registro
  // ========================================================
  crearNucleoBasico(data: any, imagen?: File): Observable<any> {
    const formData = new FormData();

    formData.append('nombre', data.nombre);
    formData.append('especialidad', data.especialidad);
    formData.append('grado_maximo', data.grado_maximo);
    formData.append('cedula_profesional', data.cedula_profesional);
    formData.append('nivel_snii', data.nivel_snii);
    formData.append('cargo', data.cargo);
    formData.append('unidad_adscripcion', data.unidad_adscripcion);
    formData.append('correo', data.correo);
    formData.append('semblanza', data.semblanza);
    formData.append('lineas_investigacion', data.lineas_investigacion);

    // IMPORTANTE → Transformar CVUs a JSON string
    formData.append('cvu_enlaces', JSON.stringify(data.cvu_enlaces));

    if (imagen) {
      formData.append('imagen', imagen);
    }

    return this.http.post(this.apiUrl, formData);
  }

  // ========================================================
  // PUT - Actualizar
  // ========================================================
  actualizarNucleoBasico(id: number, data: any, imagen?: File): Observable<any> {
    const formData = new FormData();

    formData.append('nombre', data.nombre);
    formData.append('especialidad', data.especialidad);
    formData.append('grado_maximo', data.grado_maximo);
    formData.append('cedula_profesional', data.cedula_profesional);
    formData.append('nivel_snii', data.nivel_snii);
    formData.append('cargo', data.cargo);
    formData.append('unidad_adscripcion', data.unidad_adscripcion);
    formData.append('correo', data.correo);
    formData.append('semblanza', data.semblanza);
    formData.append('lineas_investigacion', data.lineas_investigacion);

    // CVUs también en JSON
    formData.append('cvu_enlaces', JSON.stringify(data.cvu_enlaces));

    if (imagen) {
      formData.append('imagen', imagen);
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  // ========================================================
  // DELETE
  // ========================================================
  eliminarNucleoBasico(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
