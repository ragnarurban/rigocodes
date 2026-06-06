import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getCategories } from "@/lib/category";

import SuggestionForm from "./form";

const Page = async () => {
  const t = await getTranslations("Suggest");
  const categories = await getCategories();
  return (
    <section className="container-narrow py-20 md:py-28 flex flex-col">
      <Link
        href="/"
        className="mono text-sm text-muted-foreground hover:text-amber-400"
      >
        ← {t("backBtn")}
      </Link>

      <div className="my-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-amber-text-amber-400/15 text-amber-400">
        <Lightbulb className="h-6 w-6" />
      </div>
      <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight">
        {t("title")}
        <span className="text-amber-400">.</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>

      <SuggestionForm categories={categories} />
    </section>
  );
};

export default Page;
