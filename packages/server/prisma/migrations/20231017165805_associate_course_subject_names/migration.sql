/*
  Warnings:

  - You are about to drop the column `courseId` on the `course_subjects` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `course_subjects` table. All the data in the column will be lost.
  - Added the required column `courseName` to the `course_subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectName` to the `course_subjects` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_course_subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseName" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "course_subjects_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "courses" ("cou_name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "course_subjects_subjectName_fkey" FOREIGN KEY ("subjectName") REFERENCES "subjects" ("sub_name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_course_subjects" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "course_subjects";
DROP TABLE "course_subjects";
ALTER TABLE "new_course_subjects" RENAME TO "course_subjects";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
