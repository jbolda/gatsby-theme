/** @jsx jsx */
import { jsx } from "../context";

export default ({ as: Text = "span", children }) => (
  <Text sx={{ variant: `styles.${Text}` }}>{children}</Text>
);
