import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";

import { getMDXComponents } from "@/app/[locale]/mdx-components";
import { PostModel } from "@/generated/prisma/models";

import { extractHeadings } from "../lib/extract-headings";

type Props = {
  post: PostModel;
  locale: string;
};

const PostDetail = async ({ post, locale }: Props) => {
  const t = await getTranslations();

  const source = locale === "es" && post?.esBody ? post?.esBody : post?.content;
  const headings = extractHeadings(source);

  const components = getMDXComponents();

  const { content: compiled } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [rehypeSlug],
      },
    },
    components,
  });

  return (
    <article className="container-narrow py-16">
      <Link
        href={`/blog/${post.category}`}
        className="mono text-xs uppercase tracking-widest text-primary"
      >
        ← {post.category}
      </Link>
      <h1 className="mt-4 font-heading text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-balance">
        {locale === "es" && post.esTitle ? post.esTitle : post.title}
      </h1>
      <div className="mono mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>{post.createdAt.toLocaleDateString()}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
        <span>·</span>
        <span>{t("Common.byRigo")}</span>
      </div>

      <p className="mt-8 text-xl text-muted-foreground text-balance">
        {locale === "es" && post.esDesc ? post.esDesc : post.description}
      </p>

      <aside className="order-1 mt-4">
        <div className="lg:sticky lg:top-24 rounded-xl border border-border p-5">
          <p className="mono text-xs uppercase tracking-widest text-muted-foreground">
            {t("Common.contents")}
          </p>
          <ol className="mt-3 space-y-2">
            {headings.map((heading, index) => (
              <li
                key={index}
                style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
              >
                <Link
                  href={`#${heading.id}`}
                  className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {heading.text}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <div className="mt-12 grid gap-12">
        <div className="order-2 lg:order-1">{compiled}</div>
      </div>

      <div className="mt-20 border-t border-border pt-8">
        <Link
          href="/blog"
          className="mono text-sm text-muted-foreground hover:text-primary"
        >
          ← {t("Common.backToAllPostsBtn")}
        </Link>
      </div>
    </article>
  );
};

export default PostDetail;
