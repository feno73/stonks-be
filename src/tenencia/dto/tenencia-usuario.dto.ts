import { ApiProperty } from '@nestjs/swagger';

export class TenenciaUsuarioDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    nombre: string;

    @ApiProperty()
    ticker: string;

    @ApiProperty()
    cantidad: number;

    @ApiProperty({ type: String, format: 'date-time' })
    fecha_compra: Date;

    @ApiProperty()
    precio_compra: number;

    @ApiProperty()
    precio_compra_usd: number;

    @ApiProperty()
    precio_actual: number;

    @ApiProperty()
    precio_actual_usd: number;

    @ApiProperty()
    precio_venta:number

    @ApiProperty()
    precio_venta_usd:number

    @ApiProperty()
    ganancia: number;

    @ApiProperty()
    ganancia_usd: number;

    @ApiProperty()
    ganancia_porcentaje: number;

    @ApiProperty()
    ganancia_porcentaje_usd: number;
}
