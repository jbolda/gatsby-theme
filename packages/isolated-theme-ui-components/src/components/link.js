/** @jsx jsx */
import { jsx } from "../context";
import { Link as GatsbyLink } from "gatsby";

export default ({ as: Link = GatsbyLink, to, sx, children }) =>
  Link !== "a" ? (
    <Link to={to} sx={{ variant: `styles.a`, ...sx }}>
      {children}
    </Link>
  ) : (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ variant: `styles.a`, ...sx }}
    >
      {children}
    </a>
  );
