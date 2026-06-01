import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import PostList from "../blog/components/post-list";
import PostListSkeleton from "../blog/components/post-list-skeleton";

const RecentArticles = async () => {
  const t = await getTranslations("HomePage");
  return (
    <section className="container-prose border-t border-border py-16 md:py-24">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-muted-foreground">
            {t("latestSubtitle")}
          </p>
          <h2 className="mt-2 font-heading text-3xl md:text-4xl font-semibold">
            {t("latestTitle")}
          </h2>
        </div>
      </div>
      <div>
        <Suspense fallback={<PostListSkeleton />}>
          <PostList />
        </Suspense>
      </div>
    </section>
  );
};

export default RecentArticles;
