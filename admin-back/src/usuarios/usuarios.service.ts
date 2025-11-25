import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id_usuario: id },
    });

    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async create(data: Partial<Usuario>): Promise<Usuario> {
    if (!data.contraseña) {
      throw new Error('La contraseña es obligatoria');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.contraseña, salt);

    const nuevoUsuario = this.usuariosRepository.create({
      correo: data.correo,
      contraseña: hashedPassword,
      rol: data.rol ?? 'admin',
    });

    return this.usuariosRepository.save(nuevoUsuario);
  }

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const usuario = await this.findOne(id);

    if (data.contraseña) {
      const salt = await bcrypt.genSalt(10);
      data.contraseña = await bcrypt.hash(data.contraseña, salt);
    }

    Object.assign(usuario, data);

    return this.usuariosRepository.save(usuario);
  }

  async validarUsuario(correo: string, contraseña: string): Promise<Usuario | null> {
    const usuario = await this.usuariosRepository.findOne({ where: { correo } });
    if (!usuario) return null;

    const esCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
    return esCorrecta ? usuario : null;
  }
}
