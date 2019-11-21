/** @jsx jsx */
import { jsx } from "../context";
import Img from "gatsby-image";

export default ({ image }) =>
  !image || !image.fluid ? null : (
    <Img fluid={image.fluid} alt="Image of Recipe" />
  );
