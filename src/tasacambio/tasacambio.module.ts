import { Module } from '@nestjs/common';
import { TasaCambioService } from './tasacambio.service';
import { TasaCambioController } from './tasacambio.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [TasaCambioService],
    controllers: [TasaCambioController],
    exports: [TasaCambioService],
})
export class TasaCambioModule {}
