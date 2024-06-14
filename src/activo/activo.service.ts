import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Activo, Prisma } from '@prisma/client';

@Injectable()
export class ActivoService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ActivoCreateInput): Promise<Activo> {
    return this.prisma.activo.create({
      data,
    });
  }

  async findAll(): Promise<Activo[]> {
    return this.prisma.activo.findMany();
  }

  // Añade más métodos según necesites
}
