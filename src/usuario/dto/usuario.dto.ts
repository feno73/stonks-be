import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    nombre: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    fecha_creacion: Date;

    @ApiProperty({ required: false })
    ultima_conexion?: Date;
}
