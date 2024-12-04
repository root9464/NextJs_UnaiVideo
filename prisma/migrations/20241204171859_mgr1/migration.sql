/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('Pioneer', 'Champion', 'Hero', 'Legend');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "tier" "Tier" NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backet_file" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "backet_file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_generation" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,

    CONSTRAINT "video_generation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "backet_file_file_id_key" ON "backet_file"("file_id");

-- AddForeignKey
ALTER TABLE "video_generation" ADD CONSTRAINT "video_generation_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "backet_file"("file_id") ON DELETE RESTRICT ON UPDATE CASCADE;
