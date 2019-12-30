import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heading, Text, Link } from "@jbolda/isolated-theme-ui-components";

export default ({ siteMetadata }) => (
  <aside className="menu">
    <Heading
      as="h3"
      sx={{ variant: "jboldaGatsbyTheme.homepage.about.heading" }}
    >
      Contact Me
    </Heading>
    {siteMetadata.contactLinks.map(link => (
      <Link
        as="a"
        to={link.url}
        key={link.url}
        sx={{ variant: "jboldaGatsbyTheme.homepage.about.link" }}
      >
        <Text as="p" sx={{ variant: "jboldaGatsbyTheme.homepage.about.text" }}>
          <FontAwesomeIcon icon={link.icon} /> {link.text}
        </Text>
      </Link>
    ))}
  </aside>
);
