import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { useThemeUI, Flex, Box } from "theme-ui";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "@jbolda/gatsby-theme-components";
import SiteLinks from "./siteLinks";

const About = ({ site, about }) => {
  const { theme } = useThemeUI();
  return (
    <Flex
      sx={{
        alignItems: "flex-start",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: 2,
        variant: "jboldaGatsbyTheme.homepage.about.container"
      }}
    >
      {!!site || !!site.siteMetadata || !!site.siteMetadata.contactLinks ? (
        <Box
          sx={{
            width: ["85%", "25%", "25%"],
            variant: "jboldaGatsbyTheme.homepage.about.left"
          }}
        >
          <SiteLinks siteMetadata={site.siteMetadata} />
        </Box>
      ) : null}
      {!!about || !!about.childMdx || !!about.childMdx.body ? (
        <Box
          sx={{
            width: ["85%", "65%", "65%"],
            variant: "jboldaGatsbyTheme.homepage.about.right"
          }}
        >
          <MDXProvider
            components={
              theme?.jboldaGatsbyTheme?.homepage?.about?.components === null
                ? null
                : {
                    ...mdxComponents({
                      heading: "jboldaGatsbyTheme.homepage.about.heading",
                      text: "jboldaGatsbyTheme.homepage.about.text"
                    }),
                    ...(!!theme?.jboldaGatsbyTheme?.homepage?.about?.components
                      ? theme.jboldaGatsbyTheme.homepage.about.components
                      : {})
                  }
            }
          >
            <MDXRenderer>{about.childMdx.body}</MDXRenderer>
          </MDXProvider>
        </Box>
      ) : null}
    </Flex>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query jBoldaGatsbyThemeHomepageAbout {
        site {
          siteMetadata {
            siteAuthor
            contactLinks {
              text
              url
              icon
            }
          }
        }
        about: file(
          sourceInstanceName: { eq: "homepage" }
          name: { eq: "about" }
        ) {
          childMdx {
            body
          }
        }
      }
    `}
    render={queryData => {
      return <About site={queryData.site} about={queryData.about} {...props} />;
    }}
  />
);
