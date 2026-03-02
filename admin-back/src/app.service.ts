import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenido al Panel Admin del Sitio Web de la Maestría en Ingenieria';
  }
}
