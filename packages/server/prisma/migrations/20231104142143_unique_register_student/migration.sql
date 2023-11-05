/*
  Warnings:

  - A unique constraint covering the columns `[stu_registration]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "students_stu_registration_key" ON "students"("stu_registration");
