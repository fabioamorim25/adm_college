/*
  Warnings:

  - A unique constraint covering the columns `[cou_name]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "courses_cou_name_key" ON "courses"("cou_name");
