import { Controller, Get, Post, Body } from '@nestjs/common';
import { TenenciaService } from './tenencia.service';
import { Tenencia, Prisma } from '@prisma/client';

@Controller('tenencias')
export class TenenciaController {
  constructor(private readonly tenenciaService: TenenciaService) {}

  @Post()
  create(@Body() data: Prisma.TenenciaCreateInput): Promise<Tenencia> {
    return this.tenenciaService.create(data);
  }

  @Get()
  findAll(): Promise<Tenencia[]> {
    return this.tenenciaService.findAll();
  }

  // Añade más endpoints según necesites
}
