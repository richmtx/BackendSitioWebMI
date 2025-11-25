import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Get()
  getAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Usuario> {
    return this.usuariosService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.create(data);
  }

  @Post('login')
  async login(@Body() body: { correo: string; contraseña: string }) {
    const { correo, contraseña } = body;
    const usuario = await this.usuariosService.validarUsuario(correo, contraseña);

    if (!usuario) {
      return { ok: false, mensaje: 'Credenciales incorrectas' };
    }

    return {
      ok: true,
      mensaje: 'Acceso concedido',
      usuario: {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.update(id, data);
  }
}
