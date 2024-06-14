import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tenencia, Prisma } from '@prisma/client';

@Injectable()
export class TenenciaService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TenenciaCreateInput): Promise<Tenencia> {
    return this.prisma.tenencia.create({
      data,
    });
  }

  async findAll(): Promise<Tenencia[]> {
    return this.prisma.tenencia.findMany();
  }

  // Añade más métodos según necesites
}
