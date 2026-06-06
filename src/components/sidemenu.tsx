"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CategoryModel } from "@/generated/prisma/models";

import Logo from "./nav/logo";

type Props = {
  categories: CategoryModel[];
};

const SideMenu = ({ categories }: Props) => {
  const t = useTranslations("HomePage");
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" aria-label="Open side menu">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          aria-description="Site navigation mobile menu"
        >
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col w-full">
            {categories.map((category) => (
              <Button
                variant="secondary"
                asChild
                key={`site-nav-${category.key}`}
              >
                <Link href={`/blog/${category.key}`}>
                  {t(`nav${category.translationKey}`)}
                </Link>
              </Button>
            ))}

            <Button variant="secondary" asChild>
              <Link href="/contact">{t("navContact")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/suggest">{t("navSuggest")}</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideMenu;
