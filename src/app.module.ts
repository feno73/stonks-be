import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ActivoModule } from './activo/activo.module';
import { TenenciaModule } from './tenencia/tenencia.module';
import { PrecioModule } from './precio/precio.module';
import { TasaCambioModule } from './tasacambio/tasacambio.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { IOLModule } from './iol/iol.module';
import { UploaderModule } from './uploader/uploader.module';

@Module({
  imports: [
    PrismaModule,
    UsuarioModule,
    ActivoModule,
    TenenciaModule,
    PrecioModule,
    TasaCambioModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IOLModule,
    UploaderModule,
  ],
})
export class AppModule {}
