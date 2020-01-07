/** @jsx jsx */
import { jsx } from "theme-ui";
import { MDXProvider } from "@mdx-js/react";

export default ({ children, components }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};
