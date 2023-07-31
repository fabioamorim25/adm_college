-- DropIndex
DROP INDEX "departaments_dep_name_key";

-- CreateTable
CREATE TABLE "profs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prof_name" TEXT NOT NULL,
    "prof_status" BOOLEAN NOT NULL,
    "prof_email" TEXT NOT NULL,
    "prof_password" TEXT NOT NULL,
    "prof_phone" TEXT NOT NULL,
    "departamentId" TEXT NOT NULL,
    CONSTRAINT "profs_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "profs_prof_email_key" ON "profs"("prof_email");
