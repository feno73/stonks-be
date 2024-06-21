import { Module } from '@nestjs/common';
import { TenenciaService } from './tenecia.service';
import { TenenciaController } from './tenencia.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { IOLModule } from "../iol/iol.module";
import {TasaCambioModule} from "../tasacambio/tasacambio.module";


@Module({
  imports: [PrismaModule, TasaCambioModule, IOLModule],
  providers: [TenenciaService],
  controllers: [TenenciaController],
  exports: [TenenciaService],
})
export class TenenciaModule {}
