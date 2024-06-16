import { ApiProperty } from '@nestjs/swagger';

export class TenenciaDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    usuario_id: string;

    @ApiProperty()
    activo_id: string;

    @ApiProperty()
    cantidad: number;

    @ApiProperty()
    precio_compra: number;

    @ApiProperty({ type: String, format: 'date-time' })
    fecha_compra: Date;
}
