"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { CategoryModel } from "@/generated/prisma/models";

import UnderlineButton from "./underline-button";

type Props = {
  categories: CategoryModel[];
};

const SiteNav = ({ categories }: Props) => {
  const pathname = usePathname();
  const t = useTranslations("HomePage");

  const getIsActive = (path: string) => {
    return pathname === `${path}` || pathname.startsWith(`${path}`);
  };

  return (
    <div className="flex-row space-x-2 hidden md:flex mr-4 justify-items-center items-center ml-8">
      {categories.map((category) => (
        <Link href={`/blog/${category.key}`} key={`nav-btn-${category.key}`}>
          <UnderlineButton isActive={getIsActive(`/blog/${category.key}`)}>
            {t(`nav${category.translationKey}`)}
          </UnderlineButton>
        </Link>
      ))}

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
