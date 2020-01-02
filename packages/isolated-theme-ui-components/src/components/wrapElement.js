/** @jsx jsx */
import { jsx } from "theme-ui";
import { MDXProvider } from "@mdx-js/react";

export default ({ children, components }) => {
  // const defaultComponents = useMDXComponents();
  return <MDXProvider components={{ ...components }}>{children}</MDXProvider>;
};
