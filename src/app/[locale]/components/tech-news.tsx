import { ArrowUpRight, Newspaper } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const TechNews = async () => {
  return (
    <section className="container-prose border-t border-border py-16 md:py-20">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="mono flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
            <Newspaper className="h-4 w-4" /> Technology watch
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">
            News worth keeping up with.
          </h2>
          <p className="mt-4 text-muted-foreground">
            The latest from Node.js, React, Next.js, and security advisories —
            straight from the source.
          </p>
        </div>
        <Button asChild variant="outline" size="lg">
          <Link href="/news">
            Read the news <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default TechNews;
