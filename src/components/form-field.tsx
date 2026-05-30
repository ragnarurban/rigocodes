import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

const FormField = ({ label, children }: Props) => {
  return (
    <label className="block">
      <span className="mono mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
};

export default FormField;
