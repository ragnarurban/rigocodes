import { Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "../../../../components/ui/button";

type Props = { label: string };

export function EmptyCategory({ label }: Props) {
  return (
    <div className="border border-dashed border-border rounded-xl p-12 md:p-20 text-center grain">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
        <Sparkles className="h-6 w-6" />
      </div>
      <h2 className="font-display text-3xl font-semibold">
        New {label} content is brewing
      </h2>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        I&apos;m working on something here. Check back soon — or read
        what&apos;s already published.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button>
          <Link href="/blog/web-development">Read Web Dev posts</Link>
        </Button>
        <Button variant="secondary">Suggest a topic</Button>
      </div>
    </div>
  );
}
