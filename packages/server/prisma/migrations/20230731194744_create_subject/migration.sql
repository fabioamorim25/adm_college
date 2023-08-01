-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sub_name" TEXT NOT NULL,
    "sub_shift" TEXT NOT NULL,
    "sub_start_time" DATETIME NOT NULL,
    "sub_stop_time" DATETIME NOT NULL,
    "sub_description" TEXT NOT NULL,
    "sub_mandatory" BOOLEAN NOT NULL,
    "departamentId" TEXT NOT NULL,
    CONSTRAINT "subjects_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departaments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "subjects_sub_name_key" ON "subjects"("sub_name");
