/*
  Warnings:

  - You are about to drop the column `dep_email` on the `departaments` table. All the data in the column will be lost.
  - You are about to drop the column `stu_email` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `prof_email` on the `profs` table. All the data in the column will be lost.
  - Added the required column `email` to the `departaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `profs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_departaments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dep_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dep_password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_departaments" ("createdAt", "dep_name", "dep_password", "id", "updatedAt") SELECT "createdAt", "dep_name", "dep_password", "id", "updatedAt" FROM "departaments";
DROP TABLE "departaments";
ALTER TABLE "new_departaments" RENAME TO "departaments";
CREATE UNIQUE INDEX "departaments_email_key" ON "departaments"("email");
CREATE TABLE "new_students" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stu_name" TEXT NOT NULL,
    "stu_registration" TEXT NOT NULL,
    "stu_course" TEXT NOT NULL,
    "stu_status" BOOLEAN NOT NULL,
    "stu_period" TEXT NOT NULL,
    "stu_mother_name" TEXT NOT NULL,
    "stu_father_name" TEXT NOT NULL,
    "stu_phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "stu_password" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "students_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_students" ("courseId", "createdAt", "id", "stu_course", "stu_father_name", "stu_mother_name", "stu_name", "stu_password", "stu_period", "stu_phone", "stu_registration", "stu_status", "updatedAt") SELECT "courseId", "createdAt", "id", "stu_course", "stu_father_name", "stu_mother_name", "stu_name", "stu_password", "stu_period", "stu_phone", "stu_registration", "stu_status", "updatedAt" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
CREATE TABLE "new_profs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prof_name" TEXT NOT NULL,
    "prof_status" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "prof_password" TEXT NOT NULL,
    "prof_phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "departamentId" TEXT NOT NULL,
    CONSTRAINT "profs_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_profs" ("createdAt", "departamentId", "id", "prof_name", "prof_password", "prof_phone", "prof_status", "updatedAt") SELECT "createdAt", "departamentId", "id", "prof_name", "prof_password", "prof_phone", "prof_status", "updatedAt" FROM "profs";
DROP TABLE "profs";
ALTER TABLE "new_profs" RENAME TO "profs";
CREATE UNIQUE INDEX "profs_email_key" ON "profs"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
