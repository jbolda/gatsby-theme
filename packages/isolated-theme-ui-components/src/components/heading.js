/** @jsx jsx */
import { jsx } from "../context";

export default ({ as: Heading = "h1", sx, children }) => (
  <Heading sx={{ variant: `styles.${Heading}`, ...sx }}>{children}</Heading>
);
