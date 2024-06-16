import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './dto/usuario.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';


@Controller('usuarios')
@ApiTags('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUsuarioDto })
  @ApiResponse({ status: 201, description: 'El usuario ha sido creado con éxito.' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos.' })
  create(@Body() CreateUsuarioDto: CreateUsuarioDto): Promise<UsuarioDto> {
    return this.usuarioService.create(CreateUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.', type: [UsuarioDto] })
  findAll(): Promise<UsuarioDto[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario específico por ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Detalles del usuario.', type: UsuarioDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findOne(@Param('id') id: string): Promise<UsuarioDto | null> {
    return this.usuarioService.findOne(id);
  }

}
