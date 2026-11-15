import CategoryList from "@/app/[locale]/components/category-list";
import Hero from "@/app/[locale]/components/hero";
import RecentArticles from "@/app/[locale]/components/recent-articles";
import { Separator } from "@/components/ui/separator";

import TechNews from "./components/tech-news";

export default function Home() {
  return (
    <>
      <Hero />
      <Separator />
      <CategoryList />
      <TechNews />
      <RecentArticles />
    </>
  );
}
