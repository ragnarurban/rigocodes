import { Sparkles } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

const EmptyCategory = async () => {
  const t = await getTranslations("Common");
  return (
    <div className="border border-dashed border-border rounded-xl p-12 md:p-20 text-center grain">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
        <Sparkles className="h-6 w-6" />
      </div>
      <h2 className="font-display text-3xl font-semibold">
        {t("emptyCardTitle")}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        {t("emptyCardSubtitle")}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button>
          <Link href="/blog/web-development">{t("emptyCardReadWebBtn")}</Link>
        </Button>
        <Button variant="secondary">{t("emptyCardSuggest")}</Button>
      </div>
    </div>
  );
};

export default EmptyCategory;
