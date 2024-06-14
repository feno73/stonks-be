import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrecioService } from './precio.service';
import { Precio, Prisma } from '@prisma/client';

@Controller('precios')
export class PrecioController {
  constructor(private readonly precioService: PrecioService) {}

  @Post()
  create(@Body() data: Prisma.PrecioCreateInput): Promise<Precio> {
    return this.precioService.create(data);
  }

  @Get()
  findAll(): Promise<Precio[]> {
    return this.precioService.findAll();
  }

  // Añade más endpoints según necesites
}
