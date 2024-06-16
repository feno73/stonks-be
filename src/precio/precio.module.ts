import { Module } from '@nestjs/common';
import { PrecioService } from './precio.service';
import { PrecioController } from './precio.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TenenciaModule } from '../tenencia/tenencia.module';

@Module({
  imports: [PrismaModule, TenenciaModule],
  providers: [PrecioService],
  controllers: [PrecioController],
})
export class PrecioModule {}
