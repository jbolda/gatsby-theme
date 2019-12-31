/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";

export default ({ children, theme, components }) => {
  return (
    <ThemeProvider theme={theme} components={components}>
      {children}
    </ThemeProvider>
  );
};
