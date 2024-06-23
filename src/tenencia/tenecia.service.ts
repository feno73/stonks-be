import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prima.service';
import { TenenciaDto } from "./dto/tenencia.dto";
import { CreateTenenciaDto } from "./dto/create-tenencia.dto";
import { TasaCambioService } from "../tasacambio/tasacambio.service";
import { IOLService } from "../iol/iol.service";
import { TenenciaUsuarioDto } from "./dto/tenencia-usuario.dto";

@Injectable()
export class TenenciaService {
  constructor(
      private prisma: PrismaService,
      private tasaCambioService: TasaCambioService,
      private iolService: IOLService,
  ) {}

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

  async findByUsuarioId(usuarioId: string): Promise<TenenciaUsuarioDto[]> {
    const tenencias = await this.prisma.tenencia.findMany({
      where: { usuario_id: usuarioId },
      include: { activo: true },
    });
    if (tenencias.length === 0) {
      return [];
    }

    const tasaCambioActual = await this.tasaCambioService.findCurrentRate();
    console.log(tasaCambioActual)
    const results = [];

    for (const tenencia of tenencias) {
      const { activo, cantidad, fecha_compra, precio_compra } = tenencia;

      const precioActual = await this.iolService.getPrecioActual(activo.ticker);
      const precioActualUSD = precioActual / tasaCambioActual.tasa_usd_ars;
      const tasaCambioCompra = await this.tasaCambioService.findByDate(new Date(fecha_compra));
      const precioCompraUSD = precio_compra / tasaCambioCompra.tasa_usd_ars
      const ganancia = precioActual * cantidad
      const gananciaUSD = ganancia / tasaCambioActual.tasa_usd_ars;

      const gananciaPorcenaje = ((precioActual - precio_compra) / precio_compra) * 100;
      const gananciaPorcenajeUSD = ((precioActualUSD - precioCompraUSD) / precioCompraUSD) * 100;


      results.push({
        nombre: activo.nombre,
        ticker: activo.ticker,
        cantidad,
        fecha_compra,
        precio_compra,
        precio_actual: precioActual,
        precio_actual_usd: precioActualUSD,
        ganancia,
        ganancia_usd: gananciaUSD,
        ganancia_porcentaje: gananciaPorcenaje,
        ganancia_porcentaje_usd: gananciaPorcenajeUSD,
      });
    }

    return results;
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
