import { ApiProperty } from '@nestjs/swagger';

export class CreatePrecioDto {
    @ApiProperty()
    activo_id: string;

    @ApiProperty()
    precio_usd: number;

    @ApiProperty()
    precio_ars: number;

    @ApiProperty({ type: String, format: 'date-time' })
    fecha: Date;
}
