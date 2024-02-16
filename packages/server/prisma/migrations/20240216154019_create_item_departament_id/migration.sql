/*
  Warnings:

  - Added the required column `departamentId` to the `subject_subject` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subject_subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "preRequisite" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "departamentId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "subject_subject_preRequisite_fkey" FOREIGN KEY ("preRequisite") REFERENCES "subjects" ("sub_name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "subject_subject_subjectName_fkey" FOREIGN KEY ("subjectName") REFERENCES "subjects" ("sub_name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "subject_subject_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_subject_subject" ("createdAt", "id", "preRequisite", "subjectName", "updatedAt") SELECT "createdAt", "id", "preRequisite", "subjectName", "updatedAt" FROM "subject_subject";
DROP TABLE "subject_subject";
ALTER TABLE "new_subject_subject" RENAME TO "subject_subject";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
