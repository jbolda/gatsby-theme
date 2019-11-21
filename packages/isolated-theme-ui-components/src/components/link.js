/** @jsx jsx */
import { jsx } from "../context";
import { Link } from "gatsby";

export default ({ to, children }) => (
  <Link to={to} sx={{ color: "text" }}>
    {children}
  </Link>
);
