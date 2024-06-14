import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Precio, Prisma } from '@prisma/client';

@Injectable()
export class PrecioService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PrecioCreateInput): Promise<Precio> {
    return this.prisma.precio.create({
      data,
    });
  }

  async findAll(): Promise<Precio[]> {
    return this.prisma.precio.findMany();
  }

  // Añade más métodos según necesites
}
