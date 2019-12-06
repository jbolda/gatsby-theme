/** @jsx jsx */
import { jsx } from "../context";

export default ({
  as: Box = "div",
  width = ["95%", "85%", "50%"],
  sx = {},
  children
}) => <Box sx={{ width, padding: 3, ...sx }}>{children}</Box>;
