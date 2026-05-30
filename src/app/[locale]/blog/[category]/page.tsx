import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { EmptyCategory } from "@/app/[locale]/blog/components/empty-category";
import PostCard from "@/app/[locale]/blog/components/post-card";
import { Button } from "@/components/ui/button";
import { categories, Category, CURRENT_CATEGORIES } from "@/constants";
import { getPosts } from "@/lib/post";

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
  const posts = await getPosts({ category });

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
        {posts.length === 0 ? (
          <EmptyCategory label={category} />
        ) : (
          <>
            <div className="border-t border-border">
              {posts.map((postObj, i) => (
                <PostCard
                  key={postObj.slug}
                  featured={i === 0}
                  post={postObj}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button size="sm" asChild>
                <Link href="/blog/web-development">
                  {t("HomePage.exploreAllBtn")}
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default page;
