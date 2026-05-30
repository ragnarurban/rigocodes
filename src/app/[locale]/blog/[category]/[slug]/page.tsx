import PostDetail from "@/app/[locale]/blog/[category]/[slug]/components/post-detail";
import { getPost } from "@/lib/post";

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

const Page = async ({ params }: Props) => {
  const { locale, category, slug } = await params;
  const post = await getPost({ category, slug });

  return <PostDetail post={post} locale={locale} />;
};

export default Page;
