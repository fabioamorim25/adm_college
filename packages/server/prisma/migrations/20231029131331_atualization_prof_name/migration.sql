/*
  Warnings:

  - A unique constraint covering the columns `[prof_name]` on the table `profs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "profs_prof_name_key" ON "profs"("prof_name");
