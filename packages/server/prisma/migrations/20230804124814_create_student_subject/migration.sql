-- CreateTable
CREATE TABLE "student_subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "av1" REAL NOT NULL,
    "av2" REAL NOT NULL,
    "av3" REAL NOT NULL,
    "final_grade" REAL NOT NULL,
    "attendance" INTEGER NOT NULL,
    "student_count" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "student_subjects_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "student_subjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
