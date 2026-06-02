import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import PostListSkeleton from "@/components/post-list-skeleton";
import { Button } from "@/components/ui/button";
import { categories, Category, CURRENT_CATEGORIES } from "@/constants";

import PostList from "../components/post-list";

type Props = {
  params: {
    category: Category;
  };
};

const page = async ({ params }: Props) => {
  const { category } = await params;
  const t = await getTranslations();

  if (!CURRENT_CATEGORIES.includes(category)) {
    return notFound();
  }

  const pageData = categories.find((element) => element.id === category);

  return (
    <section className="container-prose py-16 md:py-24">
      <Link
        href="/"
        className="mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
      >
        ← {t("Common.backBlog")}
      </Link>
      <h1 className="mt-4 font-heading text-5xl md:text-7xl font-semibold tracking-tight">
        {t(`HomePage.section${pageData?.translationKey}Title`)}
        <span className="text-primary">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {t(`HomePage.section${pageData?.translationKey}Description`)}
      </p>

      <div className="mt-12">
        <Suspense fallback={<PostListSkeleton />}>
          <PostList category={category} />
        </Suspense>
      </div>
      <div className="mt-10 text-center">
        <Button size="sm" asChild>
          <Link href="/blog/web-development">
            {t("HomePage.exploreAllBtn")}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default page;
