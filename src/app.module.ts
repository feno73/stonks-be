import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module'; // Importa otros módulos según los vayas creando

// eslint-disable-next-line prettier/prettier
@Module({
  imports: [PrismaModule, UsuarioModule], // Añade otros módulos aquí
})
export class AppModule {}