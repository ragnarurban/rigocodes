import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

import ContactForm from "./form";

type Props = {};

const Page = async (props: Props) => {
  const t = await getTranslations("Contact");
  return (
    <div className="container-narrow py-20 md:py-28">
      <Link
        href="/"
        className="mono text-sm text-muted-foreground hover:text-primary"
      >
        ← {t("backBtn")}
      </Link>
      <p className="mono text-xs uppercase tracking-widest text-muted-foreground mt-8">
        {t("title")}
      </p>
      <h1 className="mt-3 font-heading text-5xl md:text-6xl font-semibold tracking-tight text-balance">
        {t("title")}
        <span className="italic text-primary">{t("titleColor")}</span>.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">{t("description")}</p>

      <ContactForm />

      <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        <Button variant="outline" size="sm" asChild>
          <Link
            href="href"
            className="flex items-center gap-3 bg-background p-5 hover:bg-muted/40"
          >
            <Image
              src="/github.svg"
              alt="Github icon"
              height="64"
              width="64"
              className="size-4 dark:invert"
            />
            <span className="font-medium">Github</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link
            href="href"
            className="flex items-center gap-3 bg-background p-5 hover:bg-muted/40"
          >
            <Image
              src="/linkedln.svg"
              alt="Linkedln icon"
              height="64"
              width="64"
              className="size-4 dark:invert"
            />
            <span className="font-medium">Linkedin</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link
            href="href"
            className="flex items-center gap-3 bg-background p-5 hover:bg-muted/40"
          >
            <Mail />
            <span className="font-medium">Email</span>
          </Link>
        </Button>
      </div>

      <div className="mt-16 border-t border-border pt-8"></div>
    </div>
  );
};

export default Page;
