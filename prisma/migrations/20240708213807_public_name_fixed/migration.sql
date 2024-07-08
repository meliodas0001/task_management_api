/*
  Warnings:

  - You are about to drop the column `public` on the `Container` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Container" DROP COLUMN "public",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
