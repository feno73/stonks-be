import { ApiProperty } from '@nestjs/swagger';

export class ActivoDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    nombre: string;

    @ApiProperty()
    tipo: string;

    @ApiProperty()
    ticker?: string;

    @ApiProperty()
    imagen?: string;

    @ApiProperty()
    fecha_creacion: Date;
}
