-- CreateTable
CREATE TABLE "subject_subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Id_PreRequisite" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "subject_subject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student_subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "av1" REAL,
    "av2" REAL,
    "av3" REAL,
    "final_grade" REAL,
    "attendance" INTEGER,
    "student_count" INTEGER,
    "studentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "student_subjects_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "student_subjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_student_subjects" ("attendance", "av1", "av2", "av3", "createdAt", "final_grade", "id", "studentId", "student_count", "subjectId", "updatedAt") SELECT "attendance", "av1", "av2", "av3", "createdAt", "final_grade", "id", "studentId", "student_count", "subjectId", "updatedAt" FROM "student_subjects";
DROP TABLE "student_subjects";
ALTER TABLE "new_student_subjects" RENAME TO "student_subjects";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
