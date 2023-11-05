/*
  Warnings:

  - You are about to drop the column `courseId` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `stu_course` on the `students` table. All the data in the column will be lost.
  - Added the required column `courseName` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamentId` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_students" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stu_name" TEXT NOT NULL,
    "stu_registration" TEXT NOT NULL,
    "stu_status" BOOLEAN NOT NULL,
    "stu_period" TEXT NOT NULL,
    "stu_mother_name" TEXT NOT NULL,
    "stu_father_name" TEXT NOT NULL,
    "stu_phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "departamentId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "students_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_students" ("createdAt", "email", "id", "password", "role", "stu_father_name", "stu_mother_name", "stu_name", "stu_period", "stu_phone", "stu_registration", "stu_status", "updatedAt") SELECT "createdAt", "email", "id", "password", "role", "stu_father_name", "stu_mother_name", "stu_name", "stu_period", "stu_phone", "stu_registration", "stu_status", "updatedAt" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
