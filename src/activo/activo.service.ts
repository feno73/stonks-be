import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prima.service';
import { CreateActivoDto } from './dto/create-activo.dto';
import { ActivoDto } from './dto/activo.dto';


@Injectable()
export class ActivoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateActivoDto): Promise<ActivoDto> {
    return this.prisma.activo.create({
      data,
    });
  }

  async findAll(): Promise<ActivoDto[]> {
    return this.prisma.activo.findMany();
  }

  async findOne(id: string): Promise<ActivoDto | null> {
    return this.prisma.activo.findUnique({
      where: { id },
    });
  }

}
