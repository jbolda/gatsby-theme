import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Link } from "@jbolda/isolated-theme-ui-components";

export default ({ siteMetadata }) => (
  <aside className="menu">
    <p className="menu-label">Contact Me</p>
    {siteMetadata.contactLinks.map(link => (
      <Link to={link.url}>
        <Text as="p">
          <FontAwesomeIcon icon={link.icon} /> {link.text}
        </Text>
      </Link>
    ))}
  </aside>
);
