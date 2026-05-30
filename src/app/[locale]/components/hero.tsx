import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "../../../components/ui/button";

type Props = {};

const Hero = async (props: Props) => {
  const t = await getTranslations("HomePage");
  return (
    <section className="container-prose pt-16 pb-20 md:pt-28 md:pb-28">
      <p className="mono text-sm text-muted-foreground">
        <span className="text-primary">●</span> {t("titleBadge")} · 2026
      </p>
      <h1 className="mt-6 font-heading text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight text-balance">
        {t("title1")}
        <span className="italic text-primary">{t("titleBold")}</span>{" "}
        {t("title2")}
      </h1>
      <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground text-balance">
        {t("subTitle")}
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button size="sm" asChild>
          <Link href="/blog/web-development">{t("readBlogBtn")}</Link>
        </Button>
        <Button variant="secondary" size="sm" asChild>
          <Link href="/contact">
            {t("getInTouchBtn")}
            <ArrowUpRight data-icon="inline-end" className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
