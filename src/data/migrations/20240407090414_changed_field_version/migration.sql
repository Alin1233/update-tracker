/*
  Warnings:

  - You are about to drop the column `used_version` on the `Apps` table. All the data in the column will be lost.
  - Added the required column `usedVersion` to the `Apps` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Apps" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "usedVersion" TEXT NOT NULL
);
INSERT INTO "new_Apps" ("id", "name", "url") SELECT "id", "name", "url" FROM "Apps";
DROP TABLE "Apps";
ALTER TABLE "new_Apps" RENAME TO "Apps";
CREATE UNIQUE INDEX "Apps_url_key" ON "Apps"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
