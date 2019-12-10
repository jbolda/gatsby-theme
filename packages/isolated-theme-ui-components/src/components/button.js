/** @jsx jsx */
import { jsx } from "../context";

export default props => {
  const { as: Button = "button", sx, children } = props;
  return (
    <Button sx={{ ...sx }} {...props}>
      {children}
    </Button>
  );
};
