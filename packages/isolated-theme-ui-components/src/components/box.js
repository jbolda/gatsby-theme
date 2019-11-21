/** @jsx jsx */
import { jsx } from "../context";

export default ({ width = ["95%", "85%", "50%"], children }) => (
  <div sx={{ width, padding: 3 }}>{children}</div>
);
