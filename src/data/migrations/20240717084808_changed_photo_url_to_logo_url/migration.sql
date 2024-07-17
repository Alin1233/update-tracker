/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `Apps` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Apps" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "usedVersion" TEXT NOT NULL,
    "latestVersion" TEXT,
    "logoUrl" TEXT
);
INSERT INTO "new_Apps" ("id", "latestVersion", "name", "url", "usedVersion") SELECT "id", "latestVersion", "name", "url", "usedVersion" FROM "Apps";
DROP TABLE "Apps";
ALTER TABLE "new_Apps" RENAME TO "Apps";
CREATE UNIQUE INDEX "Apps_url_key" ON "Apps"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
