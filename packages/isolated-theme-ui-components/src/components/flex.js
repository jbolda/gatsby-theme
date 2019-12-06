/** @jsx jsx */
import { jsx } from "../context";

export default ({
  as: Flex = "div",
  direction = "row",
  alignItems = "center",
  sx = {},
  children
}) => (
  <Flex
    sx={{
      display: "flex",
      flexDirection: direction,
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: alignItems,
      ...sx
    }}
  >
    {children}
  </Flex>
);
