import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) { }

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

  // LOGIN CON JWT
  @Post('login')
  async login(@Body() body: { correo: string; contraseña: string }) {
    const { correo, contraseña } = body;
    const usuario = await this.usuariosService.validarUsuario(correo, contraseña);

    if (!usuario) {
      return { ok: false, mensaje: 'Credenciales incorrectas' };
    }

    const payload = {
      sub: usuario.id_usuario,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '900'),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN || '604800'),
    });


    return {
      ok: true,
      mensaje: 'Acceso concedido',
      usuario: {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      accessToken,
      refreshToken,
    };
  }

  // ENDPOINT PARA RENOVAR ACCESS TOKEN
  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;

    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const payload = {
        sub: decoded.sub,
        correo: decoded.correo,
        rol: decoded.rol,
      };

      const newAccessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '900'),
      });

      return {
        ok: true,
        accessToken: newAccessToken,
      };
    } catch (e) {
      return {
        ok: false,
        mensaje: 'Refresh token inválido o expirado',
      };
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.update(id, data);
  }
}
