type Props = {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
};

export const Input = ({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
}: Props) => {
  return (
    <label className="block">
      <span className="mono mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring"
        defaultValue={defaultValue}
      />
    </label>
  );
};
