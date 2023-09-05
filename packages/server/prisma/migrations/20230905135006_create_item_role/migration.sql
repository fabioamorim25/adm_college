-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prof_name" TEXT NOT NULL,
    "prof_status" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "prof_phone" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'TEACHER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "departamentId" TEXT NOT NULL,
    CONSTRAINT "profs_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_profs" ("createdAt", "departamentId", "email", "id", "password", "prof_name", "prof_phone", "prof_status", "updatedAt") SELECT "createdAt", "departamentId", "email", "id", "password", "prof_name", "prof_phone", "prof_status", "updatedAt" FROM "profs";
DROP TABLE "profs";
ALTER TABLE "new_profs" RENAME TO "profs";
CREATE UNIQUE INDEX "profs_email_key" ON "profs"("email");
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
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "students_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_students" ("courseId", "createdAt", "email", "id", "password", "stu_course", "stu_father_name", "stu_mother_name", "stu_name", "stu_period", "stu_phone", "stu_registration", "stu_status", "updatedAt") SELECT "courseId", "createdAt", "email", "id", "password", "stu_course", "stu_father_name", "stu_mother_name", "stu_name", "stu_period", "stu_phone", "stu_registration", "stu_status", "updatedAt" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
CREATE TABLE "new_departaments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dep_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_departaments" ("createdAt", "dep_name", "email", "id", "password", "updatedAt") SELECT "createdAt", "dep_name", "email", "id", "password", "updatedAt" FROM "departaments";
DROP TABLE "departaments";
ALTER TABLE "new_departaments" RENAME TO "departaments";
CREATE UNIQUE INDEX "departaments_email_key" ON "departaments"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
