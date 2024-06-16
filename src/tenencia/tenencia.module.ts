import { Module } from '@nestjs/common';
import { TenenciaService } from './tenecia.service';
import { TenenciaController } from './tenencia.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TenenciaService],
  controllers: [TenenciaController],
  exports: [TenenciaService],
})
export class TenenciaModule {}
