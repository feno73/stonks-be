/*
  Warnings:

  - A unique constraint covering the columns `[activo_id,fecha]` on the table `Precio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Precio_activo_id_fecha_key" ON "Precio"("activo_id", "fecha");
