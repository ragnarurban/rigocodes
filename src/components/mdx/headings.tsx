import Link from "next/link";

const CustomH1 = ({ id, ...rest }) => {
  if (id) {
    return (
      <Link href={`#${id}`}>
        <h1 className="text-4xl font-black pb-4" {...rest} />
      </Link>
    );
  }

  return <h1 {...rest} />;
};

const CustomH2 = ({ id, ...rest }) => {
  if (id) {
    return (
      <Link href={`#${id}`}>
        <h2
          className="font-heading text-3xl md:text-4xl font-semibold tracking-tight"
          {...rest}
        />
      </Link>
    );
  }

  return <h1 {...rest} />;
};

export { CustomH1, CustomH2 };
