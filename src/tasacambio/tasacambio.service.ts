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

    async findAll(paginationQuery: { page: number, limit: number }): Promise<{
        items: TasaCambioDto[],
        totalItems: number,
        totalPages: number,
        currentPage: number
    }> {
        const { page, limit } = paginationQuery;
        console.log('Log del limit', typeof(limit), limit);
        const skip = (page - 1) * limit;
        const take = limit;

        const [items, totalItems] = await this.prisma.$transaction([
            this.prisma.tasaCambio.findMany({
                skip,
                take,
                orderBy: {
                    fecha: 'desc',
                }
            }),
            this.prisma.tasaCambio.count()
        ]);

        const totalPages = Math.ceil(totalItems / limit);

        return {
            items,
            totalItems,
            totalPages,
            currentPage: page,
        }
    }

    async findByDate(fecha: Date): Promise<TasaCambioDto | null> {
        const year = fecha.getUTCFullYear();
        const month = fecha.getUTCMonth();
        const day = fecha.getUTCDate();

        const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
        const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

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
