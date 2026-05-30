import { ArrowUpRight, Code2, Gamepad2, Sparkles } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { categories } from "@/constants";

const icons = {
  "web-development": Code2,
  "game-development": Gamepad2,
  showcase: Sparkles,
} as const;

const CategoryList = async () => {
  const t = await getTranslations("HomePage");
  return (
    <section className="container-prose border-t border-border py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-muted-foreground">
            {t("sectionSubtitle")}
          </p>
          <h2 className="mt-2 font-heading text-3xl md:text-4xl font-semibold">
            {t("sectionTitle")}
          </h2>
        </div>
      </div>
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
        {categories.map((category) => {
          const Icon = icons[category.id];
          return (
            <Link
              key={category.id}
              href={`/blog/${category.id}`}
              className="group flex flex-col gap-4 bg-background p-8 transition-colors hover:bg-muted/40"
            >
              <Icon className="h-8 w-8 text-amber-300" />
              <h3 className="font-heading text-2xl font-semibold">
                {t(`section${category.translationKey}Title`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`section${category.translationKey}Description`)}
              </p>
              <span className="mono mt-auto inline-flex items-center gap-1 text-sm text-foreground">
                {t("sectionBtn")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryList;
