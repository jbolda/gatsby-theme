/** @jsx jsx */
import React from "react";
import { jsxPragma, mdxPragma } from "isolated-theme-ui";

export const IsolatedThemeContext = React.createContext({
  theme: {},
  components: {}
});

// our custom pragmas, bootstrapped with our context
export const jsx = jsxPragma(IsolatedThemeContext);
export const mdx = mdxPragma(IsolatedThemeContext);
