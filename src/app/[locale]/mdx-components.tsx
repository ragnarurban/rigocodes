import Code from "@/components/mdx/code";
import InlineCode from "@/components/mdx/inline-code";
import Pre from "@/components/mdx/pre";

import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  pre: Pre,
  code: (props) => {
    const { className, children } = props;
    if (className) {
      return <Code {...props} />;
    }
    return <InlineCode>{children}</InlineCode>;
  },
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-black pb-4" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2
      className="font-heading text-3xl md:text-4xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      className="font-heading text-2xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }) => (
    <h4 className="text-xl font-medium pb-4" {...props}>
      {children}
    </h4>
  ),

  h5: ({ children, ...props }) => (
    <h5 className="text-lg font-normal pb-4" {...props}>
      {children}
    </h5>
  ),

  h6: ({ children, ...props }) => (
    <h6 className="text-base font-light pb-4" {...props}>
      {children}
    </h6>
  ),
  p: (props) => (
    <p className="mt-4 text-lg leading-relaxed text-foreground/90" {...props} />
  ),
  li: (props) => <li className="pb-1" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 pb-4" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 pb-4" {...props} />,
  hr: (props) => <hr className="my-4" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 pl-4 my-4 pb-0" {...props} />
  ),
  a: (props) => <a className="hover:underline font-semibold" {...props} />,

  // img: (props) => <img className="" {...props} />,
};

export function getMDXComponents(): MDXComponents {
  return components;
}
