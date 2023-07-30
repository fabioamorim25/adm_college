-- CreateTable
CREATE TABLE "departaments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dep_name" TEXT NOT NULL,
    "dep_email" TEXT NOT NULL,
    "dep_password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "departaments_dep_email_key" ON "departaments"("dep_email");
