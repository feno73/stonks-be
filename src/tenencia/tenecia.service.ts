import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prima.service';
import { TenenciaDto } from "./dto/tenencia.dto";
import { CreateTenenciaDto } from "./dto/create-tenencia.dto";

@Injectable()
export class TenenciaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTenenciaDto): Promise<TenenciaDto> {
    return this.prisma.tenencia.create({
      data,
    });
  }

  async findAll(): Promise<TenenciaDto[]> {
    return this.prisma.tenencia.findMany();
  }

  async findOne(id: string): Promise<TenenciaDto | null> {
    return this.prisma.tenencia.findUnique({
      where: { id },
    });
  }

  async findByUsuarioId(usuarioId: string): Promise<TenenciaDto[]> {
    return this.prisma.tenencia.findMany({
      where: { usuario_id: usuarioId },
    });
  }

  async findByActivoId(activoId: string): Promise<TenenciaDto[]> {
    return this.prisma.tenencia.findMany({
      where: { activo_id: activoId },
    });
  }

  async calculateAveragePurchasePrice(activoId: string): Promise<number> {
    const tenencias = await this.prisma.tenencia.findMany({
      where: { activo_id: activoId },
    });

    if (tenencias.length === 0) {
      return 0;
    }

    const totalAmount = tenencias.reduce((sum, tenencia) => sum + tenencia.cantidad, 0);
    const totalCost = tenencias.reduce((sum, tenencia) => sum + (tenencia.cantidad * tenencia.precio_compra), 0);

    return totalCost / totalAmount;
  }
}
