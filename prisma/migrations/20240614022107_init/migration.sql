-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultima_conexion" TIMESTAMP(3),

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "ticker" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenencia" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "activo_id" TEXT NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "precio_compra" DOUBLE PRECISION NOT NULL,
    "fecha_compra" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Precio" (
    "id" TEXT NOT NULL,
    "activo_id" TEXT NOT NULL,
    "precio_usd" DOUBLE PRECISION NOT NULL,
    "precio_ars" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Precio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TasaCambio" (
    "id" TEXT NOT NULL,
    "tasa_usd_ars" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TasaCambio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Tenencia_usuario_id_idx" ON "Tenencia"("usuario_id");

-- CreateIndex
CREATE INDEX "Tenencia_activo_id_idx" ON "Tenencia"("activo_id");

-- CreateIndex
CREATE INDEX "Precio_activo_id_idx" ON "Precio"("activo_id");

-- AddForeignKey
ALTER TABLE "Tenencia" ADD CONSTRAINT "Tenencia_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tenencia" ADD CONSTRAINT "Tenencia_activo_id_fkey" FOREIGN KEY ("activo_id") REFERENCES "Activo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Precio" ADD CONSTRAINT "Precio_activo_id_fkey" FOREIGN KEY ("activo_id") REFERENCES "Activo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
