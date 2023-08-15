/*
  Warnings:

  - A unique constraint covering the columns `[studentId,subjectId]` on the table `student_subjects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "student_subjects_studentId_subjectId_key" ON "student_subjects"("studentId", "subjectId");
