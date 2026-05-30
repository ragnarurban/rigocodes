import { CodeXml } from "lucide-react";
import Link from "next/link";

type Props = {};

function Logo({}: Props) {
  return (
    <Link href="/" className="flex align-middle items-center">
      <CodeXml />
      <h1 className="ml-2 font-heading text-lg font-semibold tracking-wider text-foreground uppercase">
        RIGO
        <span className="text-2xl text-green-700 ">.</span>
      </h1>
      <span className="sr-only">RigoCodes logo</span>
    </Link>
  );
}

export default Logo;
