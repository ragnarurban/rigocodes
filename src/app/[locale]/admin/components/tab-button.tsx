import Link from "next/link";

type Props = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  active?: boolean;
};
export const TabBtn = ({ id, active = false, icon: Icon, children }: Props) => {
  return (
    <Link
      href={`/admin/${id}`}
      scroll={false}
      className={`-mb-px inline-flex items-center gap-2 border-b-2 px-3 py-2 text-sm transition ${
        active
          ? "border-accent text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" /> {children}
    </Link>
  );
};
