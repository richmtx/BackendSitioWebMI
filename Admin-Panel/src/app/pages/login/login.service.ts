import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  ok: boolean;
  mensaje: string;
  usuario?: {
    id_usuario: number;
    correo: string;
    rol: string;
  };
  accessToken?: string;   // 👈 NUEVO
  refreshToken?: string;  // 👈 NUEVO
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  login(correo: string, contraseña: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      correo,
      contraseña
    });
  }

  // ✅ Guardar tokens
  guardarSesion(res: LoginResponse) {
    if (res.usuario && res.accessToken && res.refreshToken) {
      localStorage.setItem('usuario', JSON.stringify(res.usuario));
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
    }
  }

  // ✅ Obtener token
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // ✅ Cerrar sesión
  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
