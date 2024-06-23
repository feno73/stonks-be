import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TenenciaService } from './tenecia.service';
import { TenenciaDto } from './dto/tenencia.dto';
import { CreateTenenciaDto } from './dto/create-tenencia.dto';
import {TenenciaUsuarioDto} from "./dto/tenencia-usuario.dto";

@Controller('tenencias')
@ApiTags('tenencias')
export class TenenciaController {
  constructor(private readonly tenenciaService: TenenciaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tenencia para un usuario' })
  @ApiBody({ type: CreateTenenciaDto })
  @ApiResponse({ status: 201, description: 'La tenencia ha sido creada con éxito.', type: TenenciaDto })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos.' })
  create(@Body() createTenenciaDto: CreateTenenciaDto): Promise<TenenciaDto> {
    return this.tenenciaService.create(createTenenciaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tenencias' })
  @ApiResponse({ status: 200, description: 'Lista de tenencias.', type: [TenenciaDto] })
  findAll(): Promise<TenenciaDto[]> {
    return this.tenenciaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tenencia específica por ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID de la tenencia' })
  @ApiResponse({ status: 200, description: 'Detalles de la tenencia.', type: TenenciaDto })
  @ApiResponse({ status: 404, description: 'Tenencia no encontrada.' })
  findOne(@Param('id') id: string): Promise<TenenciaDto | null> {
    return this.tenenciaService.findOne(id);
  }

  @Get('usuario/:usuarioId')
  @ApiOperation({ summary: 'Obtener todas las tenencias de un usuario específico' })
  @ApiParam({ name: 'usuarioId', required: true, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de tenencias del usuario.', type: TenenciaUsuarioDto, isArray: true })
  @ApiResponse({ status: 404, description: 'Tenencias no encontradas para el usuario.' })
  findByUsuarioId(@Param('usuarioId') usuarioId: string): Promise<{
    items: TenenciaUsuarioDto[],
    totals: {}
  }> {
    return this.tenenciaService.findByUsuarioId(usuarioId);
  }

}
