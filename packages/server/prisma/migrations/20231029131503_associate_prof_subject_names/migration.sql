/*
  Warnings:

  - You are about to drop the column `profId` on the `profs_subjects` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `profs_subjects` table. All the data in the column will be lost.
  - Added the required column `profName` to the `profs_subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectName` to the `profs_subjects` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profs_subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profName" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "profs_subjects_profName_fkey" FOREIGN KEY ("profName") REFERENCES "profs" ("prof_name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profs_subjects_subjectName_fkey" FOREIGN KEY ("subjectName") REFERENCES "subjects" ("sub_name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_profs_subjects" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "profs_subjects";
DROP TABLE "profs_subjects";
ALTER TABLE "new_profs_subjects" RENAME TO "profs_subjects";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
