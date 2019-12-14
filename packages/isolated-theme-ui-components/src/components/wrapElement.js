/** @jsx jsx */
import { IsolatedThemeContext, jsx } from "../context";
import { ColorMode } from "theme-ui";
import theme from "../theme";

export default ({ children }) => (
  <IsolatedThemeContext.Provider
    value={{
      theme
    }}
  >
    <ColorMode />
    {children}
  </IsolatedThemeContext.Provider>
);
