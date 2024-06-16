import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PrecioService } from './precio.service';
import { PrecioDto } from './dto/precio.dto';
import { CreatePrecioDto } from './dto/create-precio.dto';

@Controller('precios')
@ApiTags('precios')
export class PrecioController {
  constructor(private readonly precioService: PrecioService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo precio para un activo' })
  @ApiBody({ type: CreatePrecioDto })
  @ApiResponse({ status: 201, description: 'El precio ha sido registrado con éxito.', type: PrecioDto })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos.' })
  create(@Body() createPrecioDto: CreatePrecioDto): Promise<PrecioDto> {
    return this.precioService.create(createPrecioDto);
  }


  @Get()
  @ApiOperation({ summary: 'Obtener todos los precios' })
  @ApiResponse({ status: 200, description: 'Lista de precios.', type: [PrecioDto] })
  findAll(): Promise<PrecioDto[]> {
    return this.precioService.findAll();
  }

  @Get('activo/:activoId')
  @ApiOperation({ summary: 'Obtener todos los precios de un activo específico' })
  @ApiParam({ name: 'activoId', required: true, description: 'ID del activo' })
  @ApiResponse({ status: 200, description: 'Lista de precios del activo.', type: [PrecioDto] })
  @ApiResponse({ status: 404, description: 'Precios no encontrados para el activo.' })
  findByActivoId(@Param('activoId') activoId: string): Promise<PrecioDto[]> {
    return this.precioService.findByActivoId(activoId);
  }
}
