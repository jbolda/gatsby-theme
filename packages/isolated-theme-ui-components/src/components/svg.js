/** @jsx jsx */
import { jsx } from "../context";

export default props => {
  const { as: SVG = "svg", sx, children } = props;
  return (
    <SVG sx={{ ...sx }} {...props}>
      {children}
    </SVG>
  );
};
