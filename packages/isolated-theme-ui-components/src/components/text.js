/** @jsx jsx */
import { jsx } from "../context";

export default ({ as: Text = "span", sx, children }) => (
  <Text sx={{ variant: `styles.${Text}`, ...sx }}>{children}</Text>
);
