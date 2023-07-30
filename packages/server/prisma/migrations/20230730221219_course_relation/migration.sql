/*
  Warnings:

  - A unique constraint covering the columns `[dep_name]` on the table `departaments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departamentId` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cou_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "departamentId" TEXT NOT NULL,
    CONSTRAINT "courses_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_courses" ("cou_name", "createdAt", "id", "updatedAt") SELECT "cou_name", "createdAt", "id", "updatedAt" FROM "courses";
DROP TABLE "courses";
ALTER TABLE "new_courses" RENAME TO "courses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "departaments_dep_name_key" ON "departaments"("dep_name");
