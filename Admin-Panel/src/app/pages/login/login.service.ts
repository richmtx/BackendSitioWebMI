import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from '../../config/server.config';

export interface LoginResponse {
  ok: boolean;
  mensaje: string;
  usuario?: {
    id_usuario: number;
    correo: string;
    rol: string;
  };
  accessToken?: string;
  refreshToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // URL Global
  private apiUrl = `${URL_SERVER}/usuarios`;

  constructor(private http: HttpClient) {}

  login(correo: string, contraseña: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      correo,
      contraseña
    });
  }

  guardarSesion(res: LoginResponse) {
    if (res.usuario && res.accessToken && res.refreshToken) {
      localStorage.setItem('usuario', JSON.stringify(res.usuario));
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
