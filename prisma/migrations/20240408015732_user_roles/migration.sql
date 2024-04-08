-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'Moderator', 'User');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'User';
