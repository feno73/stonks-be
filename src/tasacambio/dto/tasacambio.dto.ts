import { ApiProperty } from '@nestjs/swagger';

export class TasaCambioDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    tipo: string;

    @ApiProperty()
    tasa_usd_ars: number;

    @ApiProperty({ type: String, format: 'date-time' })
    fecha: Date;
}
