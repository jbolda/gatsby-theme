/** @jsx jsx */
import { jsx } from "../context";

export default ({ as: Heading = "h1", children }) => (
  <Heading sx={{ variant: `styles.${Heading}` }}>{children}</Heading>
);
