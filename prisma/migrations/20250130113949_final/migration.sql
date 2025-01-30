/*
  Warnings:

  - You are about to drop the column `title` on the `Job` table. All the data in the column will be lost.
  - Added the required column `job` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` DROP COLUMN `title`,
    ADD COLUMN `end` DATE NULL,
    ADD COLUMN `job` VARCHAR(255) NOT NULL,
    ADD COLUMN `start` DATE NOT NULL;
