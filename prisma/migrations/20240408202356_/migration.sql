/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Container" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContainerUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContainerUsers_AB_unique" ON "_ContainerUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ContainerUsers_B_index" ON "_ContainerUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "_ContainerUsers" ADD CONSTRAINT "_ContainerUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Container"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContainerUsers" ADD CONSTRAINT "_ContainerUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
