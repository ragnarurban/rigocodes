import Head from "next/head";
import React from "react";

type Props = {
  title: string;
  description: string;
  keywords: string;
  block?: boolean;
  canonicalURL?: string;
};

const SEO = ({ title, description, keywords }: Props) => {
  const parsedTitle = `${title} - RigoCodes.`;
  const meta = [
    {
      name: "keywords",
      content: keywords,
    },
    {
      name: "description",
      content: description,
    },
    {
      name: "og:title",
      property: parsedTitle,
    },
    // og and twitter
  ];
  return (
    <Head>
      <link rel="canonical" href={``} />
      <title>{parsedTitle}</title>
      {meta.map((item) => (
        <meta key={item.name || item.property} {...item} />
      ))}
    </Head>
  );
};

export default SEO;
