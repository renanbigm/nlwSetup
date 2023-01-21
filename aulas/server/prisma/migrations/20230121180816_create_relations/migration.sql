/*
  Warnings:

  - You are about to drop the `HabitWeekDays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "HabitWeekDays";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "habit_week_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "habit_week_days_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_day_habbits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    CONSTRAINT "day_habbits_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "day_habbits_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_day_habbits" ("day_id", "habit_id", "id") SELECT "day_id", "habit_id", "id" FROM "day_habbits";
DROP TABLE "day_habbits";
ALTER TABLE "new_day_habbits" RENAME TO "day_habbits";
CREATE UNIQUE INDEX "day_habbits_day_id_habit_id_key" ON "day_habbits"("day_id", "habit_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "habit_week_days_habit_id_week_day_key" ON "habit_week_days"("habit_id", "week_day");
