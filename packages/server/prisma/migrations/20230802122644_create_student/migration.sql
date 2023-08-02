/*
  Warnings:

  - Added the required column `updatedAt` to the `profs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stu_name" TEXT NOT NULL,
    "stu_registration" TEXT NOT NULL,
    "stu_course" TEXT NOT NULL,
    "stu_status" BOOLEAN NOT NULL,
    "stu_period" TEXT NOT NULL,
    "stu_mother_name" TEXT NOT NULL,
    "stu_father_name" TEXT NOT NULL,
    "stu_phone" TEXT NOT NULL,
    "stu_email" TEXT NOT NULL,
    "stu_password" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "students_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prof_name" TEXT NOT NULL,
    "prof_status" BOOLEAN NOT NULL,
    "prof_email" TEXT NOT NULL,
    "prof_password" TEXT NOT NULL,
    "prof_phone" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "departamentId" TEXT NOT NULL,
    CONSTRAINT "profs_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_profs" ("departamentId", "id", "prof_email", "prof_name", "prof_password", "prof_phone", "prof_status") SELECT "departamentId", "id", "prof_email", "prof_name", "prof_password", "prof_phone", "prof_status" FROM "profs";
DROP TABLE "profs";
ALTER TABLE "new_profs" RENAME TO "profs";
CREATE UNIQUE INDEX "profs_prof_email_key" ON "profs"("prof_email");
CREATE TABLE "new_subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sub_name" TEXT NOT NULL,
    "sub_shift" TEXT NOT NULL,
    "sub_start_time" DATETIME NOT NULL,
    "sub_stop_time" DATETIME NOT NULL,
    "sub_description" TEXT NOT NULL,
    "sub_mandatory" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "departamentId" TEXT NOT NULL,
    CONSTRAINT "subjects_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_subjects" ("departamentId", "id", "sub_description", "sub_mandatory", "sub_name", "sub_shift", "sub_start_time", "sub_stop_time") SELECT "departamentId", "id", "sub_description", "sub_mandatory", "sub_name", "sub_shift", "sub_start_time", "sub_stop_time" FROM "subjects";
DROP TABLE "subjects";
ALTER TABLE "new_subjects" RENAME TO "subjects";
CREATE UNIQUE INDEX "subjects_sub_name_key" ON "subjects"("sub_name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "students_stu_email_key" ON "students"("stu_email");
