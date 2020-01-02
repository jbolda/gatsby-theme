import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Nav from "@jbolda/gatsby-theme-layout";
import HelmetBlock from "./components/helmetBlock";
import { Flex, Box, Text, Link } from "@jbolda/isolated-theme-ui-components";

const ArticleLayout = ({ footerInfo, article, location, children }) => (
  <Nav location={location}>
    <HelmetBlock frontmatter={article} siteMetadata={footerInfo} />

    <Flex
      direction="column"
      sx={{ variant: "jboldaGatsbyTheme.articles.article.container" }}
    >
      {children}
      <Box sx={{ variant: "jboldaGatsbyTheme.articles.article.footer" }}>
        <Text
          as="p"
          sx={{ variant: "jboldaGatsbyTheme.articles.article.text" }}
        >
          {footerInfo.siteDescription}
        </Text>
        <Link
          to={footerInfo.siteContact}
          sx={{ variant: "jboldaGatsbyTheme.articles.article.link" }}
        >
          <Text sx={{ variant: "jboldaGatsbyTheme.articles.article.text" }}>
            Written by {footerInfo.siteAuthor}
          </Text>
        </Link>
      </Box>
    </Flex>
  </Nav>
);

export default props => (
  <StaticQuery
    query={graphql`
      query JBoldaGatsbyThemeArticleArticleLayout {
        site {
          siteMetadata {
            siteTitle
            siteAuthor
            siteDescription
            siteContact
          }
        }
      }
    `}
    render={queryData => (
      <ArticleLayout footerInfo={queryData.site.siteMetadata} {...props} />
    )}
  />
);
