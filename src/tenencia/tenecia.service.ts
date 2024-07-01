import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prima.service';
import { TenenciaDto } from "./dto/tenencia.dto";
import { CreateTenenciaDto } from "./dto/create-tenencia.dto";
import { TasaCambioService } from "../tasacambio/tasacambio.service";
import { IOLService } from "../iol/iol.service";
import { TenenciaUsuarioDto } from "./dto/tenencia-usuario.dto";
import { Redis } from 'ioredis';


@Injectable()
export class TenenciaService {
  constructor(
      private prisma: PrismaService,
      private tasaCambioService: TasaCambioService,
      private iolService: IOLService,
      @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
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

  async findByUsuarioId(usuarioId: string): Promise<{
    items: TenenciaUsuarioDto[],
    totals: {}
  }> {
    const tenencias = await this.prisma.tenencia.findMany({
      where: { usuario_id: usuarioId },
      include: { activo: true },
    });
    if (tenencias.length === 0) {
      return { items: [], totals: {}};
    }

    const tasaCambioActual = await this.tasaCambioService.findCurrentRate();

    const items = [];

    let total_ganancia = 0;
    let total_ganancia_usd = 0;
    let total_precio_compra = 0;
    let total_precio_compra_usd = 0;
    let total_precio_venta = 0;
    let total_precio_venta_usd = 0;

    for (const tenencia of tenencias) {
      const { id, activo, cantidad, fecha_compra, precio_compra } = tenencia;

      const tasa_cambio_compra = await this.tasaCambioService.findByDate(new Date(fecha_compra));

      const activo_precio_actual = await this.getPrecioActivoCache(activo.ticker);
      const activo_precio_actual_usd = activo_precio_actual / tasaCambioActual.tasa_usd_ars;
      const activo_precio_compra_usd = precio_compra / tasa_cambio_compra.tasa_usd_ars;

      const tenencia_precio_compra = precio_compra * cantidad;
      const tenencia_precio_compra_usd = activo_precio_compra_usd * cantidad;
      const tenencia_precio_venta = activo_precio_actual * cantidad;
      const tenencia_precio_venta_usd = activo_precio_actual_usd * cantidad;

      const ganancia = tenencia_precio_venta - tenencia_precio_compra;
      const ganancia_usd = tenencia_precio_venta_usd - tenencia_precio_compra_usd;

      const ganancia_porcentaje = (ganancia * 100) / (precio_compra * cantidad)
      const ganancia_porcentaje_usd = (ganancia_usd * 100) / (activo_precio_compra_usd * cantidad)


      total_ganancia += ganancia;
      total_ganancia_usd += ganancia_usd;
      total_precio_compra += tenencia_precio_compra;
      total_precio_compra_usd += tenencia_precio_compra_usd;
      total_precio_venta += tenencia_precio_venta;
      total_precio_venta_usd += tenencia_precio_venta_usd;

      console.log('Total ganancia: ', total_ganancia)
      console.log('Total ganancia_usd: ', total_ganancia_usd)
      console.log('Total precio_compra: ', total_precio_compra)
      console.log('Total precio_compra_usd: ', total_precio_compra_usd)
      console.log('Total precio_venta: ', total_precio_venta)
      console.log('Total precio_venta_usd: ', total_precio_venta_usd)

      items.push({
        id,
        nombre: activo.nombre,
        ticker: activo.ticker,
        imagen: activo.imagen,
        cantidad,
        fecha_compra,
        precio_compra,
        precio_compra_usd: activo_precio_compra_usd,
        precio_actual: activo_precio_actual,
        precio_actual_usd: activo_precio_actual_usd,
        precio_venta: tenencia_precio_venta,
        precio_venta_usd: tenencia_precio_venta_usd,
        ganancia,
        ganancia_usd: ganancia_usd,
        ganancia_porcentaje: ganancia_porcentaje,
        ganancia_porcentaje_usd: ganancia_porcentaje_usd,
      });
      console.log(items)
    }

    return {
      items,
      totals: {
        total_ganancia,
        total_ganancia_usd,
        total_precio_compra,
        total_precio_compra_usd,
        total_precio_venta,
        total_precio_venta_usd,
        total_ganancia_porcentaje: (total_ganancia * 100) / total_precio_compra,
        total_ganancia_porcentaje_usd: (total_ganancia_usd * 100) / total_precio_compra_usd,
      },
    };
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

  private async getPrecioActivoCache(ticker: string): Promise<number> {
    const hoy = new Date().toISOString().split('T')[0];
    const cache_key = `precio_activo_${ticker}_${hoy}`;

    let precio_activo = await this.redisClient.get(cache_key);



    if (precio_activo) {
      console.log('Precio activo cache hit')
      return parseFloat(precio_activo);
    }

    console.log('Precio activo cache miss')
    const nuevo_precio = await this.iolService.getPrecioActual(ticker);

    await this.redisClient.set(cache_key, nuevo_precio, 'EX', 86400);

    return nuevo_precio;
  }
}
