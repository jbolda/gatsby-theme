/** @jsx jsx */
import { jsx } from "theme-ui";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";

export default ({ children, components }) => {
  const defaultComponents = useMDXComponents();
  return (
    <MDXProvider components={{ ...defaultComponents, ...components }}>
      {children}
    </MDXProvider>
  );
};
