import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contacto } from './contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private baseUrl = 'http://localhost:3000';
  private endpoint = `${this.baseUrl}/contacto`;

  constructor(private http: HttpClient) {}

  // Obtener todos los contactos
  getContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.endpoint)
      .pipe(catchError(this.handleError));
  }

  // Crear nuevo contacto
  createContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(this.endpoint, contacto)
      .pipe(catchError(this.handleError));
  }

  // Actualizar contacto existente
  actualizarContacto(id_contacto: number, contacto: Contacto): Observable<Contacto> {
    return this.http.put<Contacto>(`${this.endpoint}/${id_contacto}`, contacto)
      .pipe(catchError(this.handleError));
  }

  // Eliminar contacto
  eliminarContacto(id_contacto: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id_contacto}`)
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en ContactoService:', error);
    return throwError(() => new Error(error.message || 'Error en la petición HTTP'));
  }
}
