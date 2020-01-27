/** @jsx jsx */
import { jsx } from "theme-ui";
import { MDXProvider } from "@mdx-js/react";

export const test = ({ children, components }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default ({ children }) => children;
