/** @jsx jsx */
import { jsx } from "../context";

export default ({ crumbs }) => (
  <nav className="breadcrumb" aria-label="breadcrumbs">
    {crumbs.map(crumb => (
      <span key={crumb.props.to} sx={{ sx: "text" }}>
        {" "}
        / {crumb}
      </span>
    ))}
  </nav>
);
