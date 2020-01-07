/** @jsx jsx */
import { jsx } from "../context";

export default props => {
  const Component = props.as || "span";
  return (
    <Component {...props} sx={{ ...props.sx }}>
      {props.children}
    </Component>
  );
};
