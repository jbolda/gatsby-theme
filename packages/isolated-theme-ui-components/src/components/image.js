/** @jsx jsx */
import { jsx } from "../context";
import Img from "gatsby-image";

export default props => <Img sx={{ ...props.sx }} {...props} />;
