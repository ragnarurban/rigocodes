"use client";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTransition } from "react";

import { useRouter, usePathname } from "@/navigation";

import { Button } from "./ui/button";

const LangPicker = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const setLanguage = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Change language button"
      onClick={() => setLanguage(locale === "en" ? "es" : "en")}
      disabled={isPending}
    >
      <Image
        src={locale === "en" ? "/en-flag.svg" : "/es-flag.svg"}
        alt={`Set language to ${locale === "en" ? "English" : "Spanish"}`}
        width={20}
        height={20}
      />
    </Button>
  );
};

export default LangPicker;
