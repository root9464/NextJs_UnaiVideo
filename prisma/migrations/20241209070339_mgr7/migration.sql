/*
  Warnings:

  - You are about to drop the `backet_file` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video_generation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "video_generation" DROP CONSTRAINT "video_generation_video_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "limits" INTEGER;

-- DropTable
DROP TABLE "backet_file";

-- DropTable
DROP TABLE "video_generation";

-- CreateTable
CREATE TABLE "video" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "video_id_key" ON "video"("id");
