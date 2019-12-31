/** @jsx jsx */
import { jsx, ThemeProvider, useThemeUI } from "theme-ui";

export default ({ children, theme, components }) => {
  const context = useThemeUI();
  return (
    <ThemeProvider
      theme={theme || context.theme}
      components={components || context.components}
    >
      {children}
    </ThemeProvider>
  );
};
