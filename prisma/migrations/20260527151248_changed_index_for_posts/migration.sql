/*
  Warnings:

  - A unique constraint covering the columns `[slug,title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Post_title_idx";

-- DropIndex
DROP INDEX "Post_title_key";

-- CreateIndex
CREATE INDEX "Post_category_slug_idx" ON "Post"("category", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_title_key" ON "Post"("slug", "title");
