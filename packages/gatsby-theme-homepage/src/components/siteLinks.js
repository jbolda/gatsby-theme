import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heading, Text, Link } from "@jbolda/isolated-theme-ui-components";

export default ({ siteMetadata }) => (
  <aside className="menu">
    <Heading as="h3">Contact Me</Heading>
    {siteMetadata.contactLinks.map(link => (
      <Link as="a" to={link.url} key={link.url}>
        <Text as="p">
          <FontAwesomeIcon icon={link.icon} /> {link.text}
        </Text>
      </Link>
    ))}
  </aside>
);
