import React from "react";

type Props = {
  label: string;
  value: number;
  icon?: React.ComponentType<{ className?: string }>;
};

const Stat = ({ label, value, icon: Icon }: Props) => {
  return (
    <div className="rounded-md border border-border p-4">
      <div className="mono flex items-center gap-2 text-xs uppercase text-muted-foreground">
        {Icon && <Icon className="h-3 w-3" />} {label}
      </div>
      <div className="mt-2 font-display text-3xl font-semibold">{value}</div>
    </div>
  );
};

export default Stat;
