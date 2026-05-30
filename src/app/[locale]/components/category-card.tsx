import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../../../components/ui/card";

type Props = {
  categoryTitle: string;
  categoryDescription: string;
  categoryUrl: string;
  categoryTransKey: string;
  categoryIcon: React.ReactNode;
};

const CategoryCard = ({
  categoryTitle,
  categoryDescription,
  categoryUrl,
  categoryTransKey,
  categoryIcon,
}: Props) => {
  return (
    <Card className="md:w-1/3 px-8 py-4 max-w-1/3">
      <span className="mt-2 text-amber-400">{categoryIcon}</span>
      <CardTitle>{categoryTitle}</CardTitle>
      <CardDescription className="min-h-20">
        {categoryDescription}
      </CardDescription>
      <CardFooter className="px-0 justify-end">
        <Button variant="ghost" size="sm" asChild>
          <Link href={categoryUrl}>
            {t("SectionBtn")}
            <MoveUpRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
