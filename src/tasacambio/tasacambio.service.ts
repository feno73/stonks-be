import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prima.service';
import { CreateTasaCambioDto } from './dto/create-tasacambio.dto';
import { TasaCambioDto } from './dto/tasacambio.dto';

@Injectable()
export class TasaCambioService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateTasaCambioDto): Promise<TasaCambioDto> {
        return this.prisma.tasaCambio.create({
            data,
        });
    }

    async findAll(): Promise<TasaCambioDto[]> {
        return this.prisma.tasaCambio.findMany();
    }

    // Añade más métodos según necesites
}
