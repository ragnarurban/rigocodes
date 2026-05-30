type Props = {
  label: string;
};

const Empty = ({ label }: Props) => {
  return (
    <p className="rounded-md border border-dashed border-border p-12 text-center text-muted-foreground">
      {label}
    </p>
  );
};

export default Empty;
