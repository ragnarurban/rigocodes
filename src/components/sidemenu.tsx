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

import Logo from "./nav/logo";

const SideMenu = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" aria-label="Open side menu">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col w-full">
            <Button variant="secondary" asChild>
              <Link href="/blog/web-development">{t("navWebDev")}</Link>
            </Button>

            <Button variant="secondary" asChild>
              <Link href="/blog/game-development">{t("navGameDev")}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/blog/showcase">{t("navShowcase")}</Link>
            </Button>
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
