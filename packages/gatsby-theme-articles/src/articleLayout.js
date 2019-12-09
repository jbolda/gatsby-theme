import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Nav from "@jbolda/gatsby-theme-layout";
import HelmetBlock from "./components/helmetBlock";
import { Box } from "@jbolda/isolated-theme-ui-components";

const ArticleLayout = ({ footerInfo, article, location, children }) => (
  <Nav location={location}>
    <HelmetBlock frontmatter={article} siteMetadata={footerInfo} />
    {children}
    <Box>
      <hr />
      <p>
        {footerInfo.siteDescription}
        <a href={footerInfo.siteContact}>
          <br /> <strong>{footerInfo.siteAuthor}</strong> on Twitter
        </a>
      </p>
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
