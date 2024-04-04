-- CreateTable
CREATE TABLE "Apps" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "used_version" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Apps_url_key" ON "Apps"("url");
