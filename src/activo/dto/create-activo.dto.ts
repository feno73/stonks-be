import { ApiProperty } from '@nestjs/swagger';

export class CreateActivoDto {
    @ApiProperty()
    nombre: string;

    @ApiProperty()
    tipo: string;

    @ApiProperty()
    ticker?: string;

    @ApiProperty()
    imagen?: string;
}
