import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
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
    findAll(): Promise<TasaCambioDto[]> {
        return this.tasaCambioService.findAll();
    }

    // Añade más endpoints según necesites
}
