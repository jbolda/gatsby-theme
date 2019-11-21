/** @jsx jsx */
import { IsolatedThemeContext, jsx } from "../context";
import theme from "../theme";

export default ({ children }) => (
  <IsolatedThemeContext.Provider
    value={{
      theme
    }}
  >
    {children}
  </IsolatedThemeContext.Provider>
);
