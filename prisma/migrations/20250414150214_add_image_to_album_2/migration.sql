/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Album` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "imageURL",
ADD COLUMN     "image" TEXT;
