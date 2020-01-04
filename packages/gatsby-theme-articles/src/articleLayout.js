import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { useThemeUI } from "theme-ui";
import Nav from "@jbolda/gatsby-theme-layout";
import HelmetBlock from "./components/helmetBlock";
import {
  mdxComponents,
  WrapElement,
  Flex,
  Box,
  Text,
  Link
} from "@jbolda/isolated-theme-ui-components";

const ArticleLayout = ({ footerInfo, article, location, children }) => {
  const { theme } = useThemeUI();

  return (
    <Nav location={location}>
      <HelmetBlock frontmatter={article} siteMetadata={footerInfo} />

      <WrapElement
        components={{
          ...mdxComponents({
            heading: "jboldaGatsbyTheme.articles.article.heading",
            text: "jboldaGatsbyTheme.articles.article.text"
          }),
          ...(!!theme &&
          !!theme.jboldaGatsbyTheme &&
          !!theme.jboldaGatsbyTheme.articles &&
          !!theme.jboldaGatsbyTheme.articles.article &&
          !!theme.jboldaGatsbyTheme.articles.article.components
            ? theme.jboldaGatsbyTheme.articles.article.components
            : {})
        }}
      >
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
      </WrapElement>
    </Nav>
  );
};

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
