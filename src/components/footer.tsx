import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import Logo from "./nav/logo";
import { Button } from "./ui/button";

const Footer = async () => {
  const t = await getTranslations("HomePage");
  return (
    <div className="flex col justify-between h-20 border-mist-800 px-12 border-t-2 items-center mt-10">
      <div>
        <Logo />
        <p className="mt-1 text-sm text-muted-foreground">
          {t("footer")} · © {new Date().getFullYear()}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="href">
            <Image
              src="/github.svg"
              alt="Github icon"
              height="64"
              width="64"
              className="size-4 dark:invert"
            />
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="href">
            <Image
              src="/linkedln.svg"
              alt="Linkedln icon"
              height="64"
              width="64"
              className="size-4 dark:invert"
            />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
