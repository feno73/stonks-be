import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prima.service';
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UsuarioDto } from "./dto/usuario.dto";


@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuarioDto): Promise<UsuarioDto> {
    return this.prisma.usuario.create({
      data,
    });
  }

  async findAll(): Promise<UsuarioDto[]> {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: string): Promise<UsuarioDto | null> {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }
}
