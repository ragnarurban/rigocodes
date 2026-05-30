import Link from "next/link";

type Props = {
  createdAt?: Date;
  readingTime?: string;
  title?: string;
  description?: string;
  tags?: string[];
  postUrl?: string;
  featured?: boolean;
};

const RecentArticle = ({
  createdAt = new Date(),
  readingTime = "8 minutes read",
  title = "The Quiet Power of Server Components Why",
  description = "Moving rendering back to the server is the most interesting shift in frontend in a decade. React, Architecture, Performance.",
  tags = ["React", "Architecture", "Performance"],
  postUrl = "/blog/web-development/1",
  featured = false,
}: Props) => {
  return (
    <Link
      href={postUrl}
      className="group block border-b border-border py-6 transition-colors hover:bg-muted/30"
    >
      <div className="mono mb-2 flex items-center gap-3 text-xs text-muted-foreground">
        <span>
          {new Date(createdAt).toLocaleDateString("en", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
        <span>·</span>
        <span>{readingTime}</span>
      </div>
      <h3
        className={`font-display ${featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"} font-semibold leading-tight text-balance group-hover:text-accent transition-colors`}
      >
        {title}
      </h3>
      <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={`${title}-${tag}`}
            className="mono rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default RecentArticle;
