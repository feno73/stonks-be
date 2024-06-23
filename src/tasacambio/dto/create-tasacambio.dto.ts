import { ApiProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';

export class CreateTasaCambioDto {
    @ApiProperty()
    @IsString()
    tipo: string;

    @ApiProperty()
    tasa_usd_ars: number;

    @ApiProperty({ type: String, format: 'date-time' })
    fecha: Date;
}
