import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateActivoDto } from './create-activo.dto';

export class UpdateActivoDto extends PartialType(CreateActivoDto) {
    @ApiProperty()
    nombre?: string;

    @ApiProperty()
    tipo?: string;

    @ApiProperty()
    ticker?: string;

    @ApiProperty()
    imagen?: string;
}
