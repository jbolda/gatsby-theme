import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { useThemeUI, Flex } from "theme-ui";
import Nav from "./components/nav";
import HelmetBlock from "./components/helmetBlock";
import Footer from "./components/footer";
import { mdxComponents } from "@jbolda/gatsby-theme-components";
import { MDXProvider } from "@mdx-js/react";

const ArticleLayout = ({ footerInfo, article, location, children }) => {
  const { theme } = useThemeUI();

  return (
    <Nav location={location}>
      <HelmetBlock frontmatter={article} siteMetadata={footerInfo} />

      <MDXProvider
        components={
          theme?.jboldaGatsbyTheme?.articles?.article?.components === null
            ? null
            : {
                ...mdxComponents({
                  heading: "jboldaGatsbyTheme.articles.article.heading",
                  text: "jboldaGatsbyTheme.articles.article.text",
                }),
                ...(!!theme?.jboldaGatsbyTheme?.articles?.article?.components
                  ? theme.jboldaGatsbyTheme.articles.article.components
                  : {}),
              }
        }
      >
        <Flex
          sx={{
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            variant: "jboldaGatsbyTheme.articles.article.container",
          }}
        >
          {children}
          <Footer {...footerInfo} />
        </Flex>
      </MDXProvider>
    </Nav>
  );
};

export default (props) => (
  <StaticQuery
    query={graphql`
      query JBoldaGatsbyThemeArticleArticleLayout {
        site {
          siteMetadata {
            siteTitle
            siteAuthor
            siteDescription
            siteContact
            siteURL
          }
        }
      }
    `}
    render={(queryData) => (
      <ArticleLayout footerInfo={queryData.site.siteMetadata} {...props} />
    )}
  />
);
