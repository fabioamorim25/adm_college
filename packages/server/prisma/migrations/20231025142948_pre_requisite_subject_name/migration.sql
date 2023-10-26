/*
  Warnings:

  - You are about to drop the column `Id_PreRequisite` on the `subject_subject` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `subject_subject` table. All the data in the column will be lost.
  - Added the required column `preRequisite` to the `subject_subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectName` to the `subject_subject` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subject_subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "preRequisite" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "subject_subject_subjectName_fkey" FOREIGN KEY ("subjectName") REFERENCES "subjects" ("sub_name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_subject_subject" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "subject_subject";
DROP TABLE "subject_subject";
ALTER TABLE "new_subject_subject" RENAME TO "subject_subject";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
