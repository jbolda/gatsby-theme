/** @jsx jsx */
import { jsx } from "../context";

export default ({
  as: Text = "span",
  sx,
  children,
  dangerouslySetInnerHTML
}) => (
  <Text
    sx={{ variant: `styles.${Text}`, ...sx }}
    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
  >
    {children}
  </Text>
);
