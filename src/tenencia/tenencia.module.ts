import { Module } from '@nestjs/common';
import { TenenciaService } from './tenencia.service';
import { TenenciaController } from './tenencia.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TenenciaService],
  controllers: [TenenciaController],
})
export class TenenciaModule {}
