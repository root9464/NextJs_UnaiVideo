/*
  Warnings:

  - Added the required column `limits` to the `video_generation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "video_generation" ADD COLUMN     "limits" INTEGER NOT NULL;
