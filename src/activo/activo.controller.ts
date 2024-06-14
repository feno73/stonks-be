import { Controller, Get, Post, Body } from '@nestjs/common';
import { ActivoService } from './activo.service';
import { Activo, Prisma } from '@prisma/client';

@Controller('activos')
export class ActivoController {
  constructor(private readonly activoService: ActivoService) {}

  @Post()
  create(@Body() data: Prisma.ActivoCreateInput): Promise<Activo> {
    return this.activoService.create(data);
  }

  @Get()
  findAll(): Promise<Activo[]> {
    return this.activoService.findAll();
  }

  // Añade más endpoints según necesites
}
