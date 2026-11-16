import type React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

const FormField = ({ label, children }: Props) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the control is passed in as children
    <label className="block">
      <span className="mono mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
};

export default FormField;
