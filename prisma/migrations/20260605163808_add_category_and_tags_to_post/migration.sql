-- =========================================================================
-- 1. CONSTRUCT NEW STRUCTURAL TABLES
-- =========================================================================

CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "translationKey" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT false,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "translationKey" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PostToTag_AB_pkey" PRIMARY KEY ("A","B")
);

CREATE UNIQUE INDEX "Category_key_key" ON "Category"("key");
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX "Category_translationKey_key" ON "Category"("translationKey");
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- =========================================================================
-- 2. MIGRATE AND EXTRACT EXISTENT DATA (BEFORE WE DROP ANYTHING)
-- =========================================================================

-- Extract strings array entries to populate your unique relation Tag records
INSERT INTO "Tag" ("name", "translationKey")
SELECT DISTINCT unnest(tags), 'tags.' || unnest(tags)
FROM "Post"
WHERE tags IS NOT NULL AND array_length(tags, 1) > 0
ON CONFLICT ("name") DO NOTHING;

-- Map join relations inside the pivot cross table
INSERT INTO "_PostToTag" ("A", "B")
SELECT p.id, t.id
FROM "Post" p
CROSS JOIN LATERAL unnest(p.tags) AS old_tag_name
JOIN "Tag" t ON t.name = old_tag_name;

-- Initialize a fallback category for current records
INSERT INTO "Category" ("key", "name", "translationKey", "active") 
VALUES ('uncategorized', 'Uncategorized', 'categories.uncategorized', true);

-- =========================================================================
-- 3. APPLY CATEGORY RELATIONS AS NULLABLE (TEMPORARY FIX FOR BOTH TABLES)
-- =========================================================================

-- Add categoryId columns as NULLABLE first so existing rows don't complain
ALTER TABLE "Post" ADD COLUMN "categoryId" INTEGER;
ALTER TABLE "Suggestion" ADD COLUMN "categoryId" INTEGER;

-- Backfill existing entries to point to the new 'uncategorized' group
UPDATE "Post" SET "categoryId" = (SELECT id FROM "Category" WHERE key = 'uncategorized');
UPDATE "Suggestion" SET "categoryId" = (SELECT id FROM "Category" WHERE key = 'uncategorized');

-- =========================================================================
-- 4. HARDEN CONSTRAINTS AND ENFORCE "NOT NULL"
-- =========================================================================

-- Now that everyone has a category assigned, safely lock the columns to NOT NULL
ALTER TABLE "Post" ALTER COLUMN "categoryId" SET NOT NULL;
ALTER TABLE "Suggestion" ALTER COLUMN "categoryId" SET NOT NULL;

-- Drop legacy string columns
DROP INDEX IF EXISTS "Post_category_slug_idx";
ALTER TABLE "Post" DROP COLUMN "category", DROP COLUMN "tags";
ALTER TABLE "Suggestion" DROP COLUMN "category";

-- Rebuild indexes matching updated structures
CREATE INDEX "Post_slug_idx" ON "Post"("slug");

-- =========================================================================
-- 5. WRITE SYSTEM FOREIGN KEY REFERENCES
-- =========================================================================

ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;