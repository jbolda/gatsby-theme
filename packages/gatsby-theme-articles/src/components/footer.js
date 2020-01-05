import React from "react";
import { Box, Text, Link } from "@jbolda/isolated-theme-ui-components";

export default ({ siteDescription, siteContact, siteAuthor }) => (
  <Box sx={{ variant: "jboldaGatsbyTheme.articles.article.footer" }}>
    <Text as="p" sx={{ variant: "jboldaGatsbyTheme.articles.article.text" }}>
      {siteDescription}
    </Text>
    <Link
      as="a"
      to={siteContact}
      sx={{ variant: "jboldaGatsbyTheme.articles.article.link" }}
    >
      <Text sx={{ variant: "jboldaGatsbyTheme.articles.article.text" }}>
        Written by {siteAuthor}
      </Text>
    </Link>
  </Box>
);
