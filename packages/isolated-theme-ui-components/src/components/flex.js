/** @jsx jsx */
import { jsx } from "../context";

export default ({ direction = "row", alignItems = "center", children }) => (
  <div
    sx={{
      display: "flex",
      flexDirection: direction,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: alignItems
    }}
  >
    {children}
  </div>
);
