import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import Logo from "./nav/logo";
import { Button } from "./ui/button";

type Props = {};

const Footer = async (props: Props) => {
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
        <Button variant="outline" size="sm" asChild>
          <Link href="href">
            <Mail />
          </Link>
        </Button>
      </div>
    </div>
  );
};

// <div className="flex items-center gap-2">
//           {socials.map((s) => (
//             <a
//               key={s.label}
//               href={s.href}
//               target="_blank"
//               rel="noreferrer"
//               aria-label={s.label}
//               className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
//             >
//               <s.icon className="h-4 w-4" />
//             </a>
//           ))}
//         </div>

export default Footer;
