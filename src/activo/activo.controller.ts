import {Controller, Get, Post, Put, Param, Body, Delete} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ActivoService } from './activo.service';
import { ActivoDto } from './dto/activo.dto';
import { CreateActivoDto } from './dto/create-activo.dto';
import { UpdateActivoDto } from './dto/update-activo.dto';

@Controller('activos')
@ApiTags('activos')
export class ActivoController {
  constructor(private readonly activoService: ActivoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo activo' })
  @ApiBody({ type: CreateActivoDto })
  @ApiResponse({ status: 201, description: 'El activo ha sido creado con éxito.', type: ActivoDto })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos.' })
  create(@Body() createActivoDto: CreateActivoDto): Promise<ActivoDto> {
    return this.activoService.create(createActivoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los activos' })
  @ApiResponse({ status: 200, description: 'Lista de activos.', type: [ActivoDto] })
  findAll(): Promise<ActivoDto[]> {
    return this.activoService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un activo específico por ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID del activo' })
  @ApiBody({ type: UpdateActivoDto })
  @ApiResponse({ status: 200, description: 'El activo ha sido actualizado con éxito.', type: ActivoDto })
  @ApiResponse({ status: 404, description: 'Activo no encontrado.' })
  update(@Param('id') id: string, @Body() updateActivoDto: UpdateActivoDto): Promise<ActivoDto> {
    return this.activoService.update(id, updateActivoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un activo específico por ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID del activo' })
  @ApiResponse({ status: 200, description: 'El activo ha sido eliminado con éxito.', type: ActivoDto })
  @ApiResponse({ status: 404, description: 'Activo no encontrado.' })
  delete(@Param('id') id: string): Promise<ActivoDto> {
    return this.activoService.delete(id);
  }
}
