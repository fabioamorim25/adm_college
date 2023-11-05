/*
  Warnings:

  - A unique constraint covering the columns `[stu_name]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "students_stu_name_key" ON "students"("stu_name");
