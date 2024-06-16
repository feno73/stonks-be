import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ActivoModule } from './activo/activo.module';
import { TenenciaModule } from './tenencia/tenencia.module';
import { PrecioModule } from './precio/precio.module';
import { TasaCambioModule } from './tasacambio/tasacambio.module';

@Module({
  imports: [
    PrismaModule,
    UsuarioModule,
    ActivoModule,
    TenenciaModule,
    PrecioModule,
    TasaCambioModule,
  ],
})
export class AppModule {}
