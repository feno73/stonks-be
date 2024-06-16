import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prima.service';
import { CreatePrecioDto } from './dto/create-precio.dto';
import { PrecioDto } from './dto/precio.dto';
import { TenenciaService } from "../tenencia/tenecia.service";



@Injectable()
export class PrecioService {
  constructor(
      private prisma: PrismaService,
      private tenenciaService: TenenciaService
  ) {}

  async create(data: CreatePrecioDto): Promise<PrecioDto> {
    return this.prisma.precio.create({
      data,
    });
  }

  async findAll(): Promise<PrecioDto[]> {
    return this.prisma.precio.findMany();
  }

  async findByActivoId(activoId: string): Promise<PrecioDto[]> {
    return this.prisma.precio.findMany({
      where: { activo_id: activoId },
    });
  }

  async calculateProfitOrLoss(activoId: string): Promise<number> {
    const latestPrice = await this.prisma.precio.findFirst({
      where: { activo_id: activoId },
      orderBy: { fecha: 'desc' },
    });

    if (!latestPrice) {
      return 0;
    }

    const averagePurchasePrice = await this.tenenciaService.calculateAveragePurchasePrice(activoId);
    const tenencias = await this.tenenciaService.findByActivoId(activoId);

    const totalAmount = tenencias.reduce((sum, tenencia) => sum + tenencia.cantidad, 0);
    const totalCurrentValue = totalAmount * latestPrice.precio_usd;
    const totalPurchaseValue = totalAmount * averagePurchasePrice;

    return totalCurrentValue - totalPurchaseValue;
  }
}
