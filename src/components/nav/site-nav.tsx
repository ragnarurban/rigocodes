"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UnderlineButton from "./underline-button";
import { useTranslations } from "next-intl";

type Props = {};

const SiteNav = (props: Props) => {
  const pathname = usePathname();
  const t = useTranslations("HomePage");

  const getIsActive = (path: string) => {
    return pathname === `${path}` || pathname.startsWith(`${path}`);
  };

  return (
    <div className="flex-row space-x-2 hidden md:flex mr-4 justify-items-center items-center ml-8">
      <Link href="/blog/web-development">
        <UnderlineButton isActive={getIsActive("/blog/web-development")}>
          {t("navWebDev")}
        </UnderlineButton>
      </Link>

      <Link href="/blog/game-development">
        <UnderlineButton isActive={getIsActive("/blog/game-development")}>
          {t("navGameDev")}
        </UnderlineButton>
      </Link>

      <Link href="/blog/showcase">
        <UnderlineButton isActive={getIsActive("/blog/showcase")}>
          {t("navShowcase")}
        </UnderlineButton>
      </Link>

      <Link href="/contact">
        <UnderlineButton isActive={getIsActive("/contact")}>
          {t("navContact")}
        </UnderlineButton>
      </Link>

      <Link href="/suggest">
        <UnderlineButton isActive={getIsActive("/suggest")}>
          {t("navSuggest")}
        </UnderlineButton>
      </Link>
    </div>
  );
};

export default SiteNav;
