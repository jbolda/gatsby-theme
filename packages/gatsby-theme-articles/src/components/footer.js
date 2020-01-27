import React from "react";
import { Box, Text, Link } from "theme-ui";

export default ({ siteDescription, siteContact, siteAuthor }) => (
  <Box
    sx={{
      width: ["95%", "85%", "50%"],
      padding: 3,
      variant: "jboldaGatsbyTheme.articles.article.footer"
    }}
  >
    <Link
      as="a"
      target="_blank"
      rel="noopener noreferrer"
      href={siteContact}
      sx={{ variant: "jboldaGatsbyTheme.articles.article.link" }}
    >
      <Text sx={{ variant: "jboldaGatsbyTheme.articles.article.text" }}>
        Written by {siteAuthor}
      </Text>
    </Link>
    <Text as="p" sx={{ variant: "jboldaGatsbyTheme.articles.article.text" }}>
      {siteDescription}
    </Text>
  </Box>
);
