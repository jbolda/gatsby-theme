import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Nav from "@jbolda/gatsby-theme-layout";
import HelmetBlock from "./components/helmetBlock";
import { Box, Text, Link } from "@jbolda/isolated-theme-ui-components";

const ArticleLayout = ({ footerInfo, article, location, children }) => (
  <Nav location={location}>
    <HelmetBlock frontmatter={article} siteMetadata={footerInfo} />
    {children}
    <Box sx={{ variant: "jboldaGatsbyTheme.articles.article.footer" }}>
      <Text as="p">{footerInfo.siteDescription}</Text>
      <Link to={footerInfo.siteContact}>
        <Text>Written by {footerInfo.siteAuthor}</Text>
      </Link>
    </Box>
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
