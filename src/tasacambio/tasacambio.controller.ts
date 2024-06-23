import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TasaCambioService } from './tasacambio.service';
import { TasaCambioDto } from './dto/tasacambio.dto';
import { CreateTasaCambioDto } from './dto/create-tasacambio.dto';

@Controller('tasascambio')
@ApiTags('tasascambio')
export class TasaCambioController {
    constructor(private readonly tasaCambioService: TasaCambioService) {}

    @Post()
    @ApiOperation({ summary: 'Registrar una nueva tasa de cambio' })
    @ApiBody({ type: CreateTasaCambioDto })
    @ApiResponse({ status: 201, description: 'La tasa de cambio ha sido registrada con éxito.', type: TasaCambioDto })
    @ApiResponse({ status: 400, description: 'Parámetros inválidos.' })
    create(@Body() createTasaCambioDto: CreateTasaCambioDto): Promise<TasaCambioDto> {
        return this.tasaCambioService.create(createTasaCambioDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las tasas de cambio' })
    @ApiResponse({ status: 200, description: 'Lista de tasas de cambio.', type: [TasaCambioDto] })
    findAll(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
    ): Promise<{
        items: TasaCambioDto[],
        totalItems: number,
        totalPages: number,
        currentPage: number
    }> {
        const pageNumber = parseInt(page, 10)
        const limitNumber = parseInt(limit, 10)
        return this.tasaCambioService.findAll({ page: pageNumber, limit: limitNumber });
    }

    @Get('por-fecha')
    @ApiOperation({ summary: 'Obtener la tasa de cambio por fecha' })
    @ApiQuery({ name: 'fecha', required: true, type: String, description: 'Fecha de la tasa de cambio.' })
    @ApiResponse({ status: 200, description: 'La tasa de cambio ha sido obtenida con éxito.', type: TasaCambioDto })
    @ApiResponse({ status: 400, description: 'Parámetros inválidos.' })
    findByDate(@Query('fecha') fecha: string): Promise<TasaCambioDto | null> {
        const date = new Date(fecha);
        return this.tasaCambioService.findByDate(date);
    }
}
