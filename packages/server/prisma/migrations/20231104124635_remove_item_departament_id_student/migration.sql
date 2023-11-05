/*
  Warnings:

  - You are about to drop the column `departamentId` on the `students` table. All the data in the column will be lost.

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
    "courseName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "students_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_students" ("courseName", "createdAt", "email", "id", "password", "role", "stu_father_name", "stu_mother_name", "stu_name", "stu_period", "stu_phone", "stu_registration", "stu_status", "updatedAt") SELECT "courseName", "createdAt", "email", "id", "password", "role", "stu_father_name", "stu_mother_name", "stu_name", "stu_period", "stu_phone", "stu_registration", "stu_status", "updatedAt" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
CREATE UNIQUE INDEX "students_stu_name_key" ON "students"("stu_name");
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
