/** @jsx jsx */
import { jsx } from "../context";
import { Link as GatsbyLink } from "gatsby";

export default ({ as: Link = GatsbyLink, to, children }) =>
  Link !== "a" ? (
    <Link to={to} sx={{ variant: `styles.a` }}>
      {children}
    </Link>
  ) : (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ variant: `styles.a` }}
    >
      {children}
    </a>
  );
