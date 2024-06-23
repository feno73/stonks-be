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

    async findByDate(fecha: Date): Promise<TasaCambioDto | null> {
        const startOfDay = new Date(fecha);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(fecha);
        endOfDay.setHours(23, 59, 59, 999);

        return this.prisma.tasaCambio.findFirst({
            where: {
                fecha: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });
    }

    async findCurrentRate(): Promise<TasaCambioDto | null> {
        const today = new Date();
        console.log('Log del hoy',today);
        let rate = await this.findByDate(today);
        console.log('Rate de hoy',rate);
        if(!rate) {
            rate = await this.prisma.tasaCambio.findFirst({
                orderBy: {
                    fecha: 'desc',
                }
            })
        }
        console.log('Rate final',rate);
        return rate;
    }
}
