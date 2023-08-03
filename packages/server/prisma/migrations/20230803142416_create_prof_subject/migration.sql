-- CreateTable
CREATE TABLE "profs_subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "profs_subjects_profId_fkey" FOREIGN KEY ("profId") REFERENCES "profs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profs_subjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
