/*
  Warnings:

  - Added the required column `tipo` to the `TasaCambio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TasaCambio" ADD COLUMN     "tipo" TEXT NOT NULL;
