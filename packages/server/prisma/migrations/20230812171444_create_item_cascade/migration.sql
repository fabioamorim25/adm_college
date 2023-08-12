-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cou_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "departamentId" TEXT NOT NULL,
    CONSTRAINT "courses_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_courses" ("cou_name", "createdAt", "departamentId", "id", "updatedAt") SELECT "cou_name", "createdAt", "departamentId", "id", "updatedAt" FROM "courses";
DROP TABLE "courses";
ALTER TABLE "new_courses" RENAME TO "courses";
CREATE TABLE "new_address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "add_street" TEXT NOT NULL,
    "add_city" TEXT NOT NULL,
    "add_neighborhood" TEXT NOT NULL,
    "add_number" TEXT NOT NULL,
    "add_complement" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "address_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_address" ("add_city", "add_complement", "add_neighborhood", "add_number", "add_street", "createdAt", "id", "studentId", "updatedAt") SELECT "add_city", "add_complement", "add_neighborhood", "add_number", "add_street", "createdAt", "id", "studentId", "updatedAt" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
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
    "stu_email" TEXT NOT NULL,
    "stu_password" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "students_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_students" ("courseId", "createdAt", "id", "stu_course", "stu_email", "stu_father_name", "stu_mother_name", "stu_name", "stu_password", "stu_period", "stu_phone", "stu_registration", "stu_status", "updatedAt") SELECT "courseId", "createdAt", "id", "stu_course", "stu_email", "stu_father_name", "stu_mother_name", "stu_name", "stu_password", "stu_period", "stu_phone", "stu_registration", "stu_status", "updatedAt" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
CREATE UNIQUE INDEX "students_stu_email_key" ON "students"("stu_email");
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
    CONSTRAINT "subjects_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_subjects" ("createdAt", "departamentId", "id", "sub_description", "sub_mandatory", "sub_name", "sub_shift", "sub_start_time", "sub_stop_time", "updatedAt") SELECT "createdAt", "departamentId", "id", "sub_description", "sub_mandatory", "sub_name", "sub_shift", "sub_start_time", "sub_stop_time", "updatedAt" FROM "subjects";
DROP TABLE "subjects";
ALTER TABLE "new_subjects" RENAME TO "subjects";
CREATE UNIQUE INDEX "subjects_sub_name_key" ON "subjects"("sub_name");
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
    CONSTRAINT "profs_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_profs" ("createdAt", "departamentId", "id", "prof_email", "prof_name", "prof_password", "prof_phone", "prof_status", "updatedAt") SELECT "createdAt", "departamentId", "id", "prof_email", "prof_name", "prof_password", "prof_phone", "prof_status", "updatedAt" FROM "profs";
DROP TABLE "profs";
ALTER TABLE "new_profs" RENAME TO "profs";
CREATE UNIQUE INDEX "profs_prof_email_key" ON "profs"("prof_email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
