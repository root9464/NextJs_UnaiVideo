/*
  Warnings:

  - You are about to drop the column `file_id` on the `backet_file` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[video_id]` on the table `backet_file` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `video_id` to the `backet_file` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "video_generation" DROP CONSTRAINT "video_generation_video_id_fkey";

-- DropIndex
DROP INDEX "backet_file_file_id_key";

-- AlterTable
ALTER TABLE "backet_file" DROP COLUMN "file_id",
ADD COLUMN     "video_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "backet_file_video_id_key" ON "backet_file"("video_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "video_generation" ADD CONSTRAINT "video_generation_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "backet_file"("video_id") ON DELETE RESTRICT ON UPDATE CASCADE;
