import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/posts",
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withMDX(nextConfig));
