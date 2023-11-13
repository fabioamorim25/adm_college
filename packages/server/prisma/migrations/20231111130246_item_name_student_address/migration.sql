/*
  Warnings:

  - You are about to drop the column `studentId` on the `address` table. All the data in the column will be lost.
  - Added the required column `studentName` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "add_street" TEXT NOT NULL,
    "add_city" TEXT NOT NULL,
    "add_neighborhood" TEXT NOT NULL,
    "add_number" TEXT NOT NULL,
    "add_complement" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "address_studentName_fkey" FOREIGN KEY ("studentName") REFERENCES "students" ("stu_name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_address" ("add_city", "add_complement", "add_neighborhood", "add_number", "add_street", "createdAt", "id", "updatedAt") SELECT "add_city", "add_complement", "add_neighborhood", "add_number", "add_street", "createdAt", "id", "updatedAt" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
