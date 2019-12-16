/** @jsx jsx */
import { IsolatedThemeContext, jsx } from "../context";
import { Global } from "@emotion/core";
import { createColorStyles } from "theme-ui/src/custom-properties";
import theme from "../theme";

const bodyColor = theme => ({
  body: createColorStyles(theme)
});

export default ({ element }) => (
  <IsolatedThemeContext.Provider
    value={{
      theme
    }}
  >
    <Global styles={bodyColor} />
    <div>
      <span>test text</span>
    </div>
    {element}
  </IsolatedThemeContext.Provider>
);
