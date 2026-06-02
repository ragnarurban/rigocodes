import { Suspense } from "react";

import PostListSkeleton from "@/components/post-list-skeleton";

import PostDetail from "./components/post-detail";

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

const Page = async ({ params }: Props) => {
  const { locale, category, slug } = await params;

  return (
    <article className="container-narrow py-16">
      <Suspense fallback={<PostListSkeleton />}>
        <PostDetail category={category} slug={slug} locale={locale} />
      </Suspense>
    </article>
  );
};

export default Page;
