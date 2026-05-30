import Link from "next/link";

import { PostModel } from "@/generated/prisma/models";

type Props = {
  post: PostModel;
  featured?: boolean;
};

const PostCard = ({ post, featured = false }: Props) => {
  return (
    <Link
      href={`/blog/${post?.category}/${post?.slug}`}
      className="group block border-b border-border py-6 transition-colors hover:bg-muted/30"
    >
      <div className="mono mb-2 flex items-center gap-3 text-xs text-muted-foreground">
        <span>{post?.createdAt.toLocaleDateString()}</span>
        <span>·</span>
        <span>{post?.readingTime}</span>
      </div>
      <h3
        className={`font-display ${featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"} font-semibold leading-tight text-balance group-hover:text-accent transition-colors`}
      >
        {post?.title}
      </h3>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {post?.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post?.tags.map((tag) => (
          <span
            key={`${post?.title}-${tag}`}
            className="mono rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default PostCard;
