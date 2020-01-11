import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { useThemeUI } from "theme-ui";
import {
  mdxComponents,
  contextMDX,
  WrapElement,
  Flex,
  Box
} from "@jbolda/isolated-theme-ui-components";
import SiteLinks from "./siteLinks";

const About = ({ site, about }) => (
  <Flex
    alignItems="flex-start"
    sx={{
      padding: 2,
      variant: "jboldaGatsbyTheme.homepage.about.container"
    }}
  >
    {!!site || !!site.siteMetadata || !!site.siteMetadata.contactLinks ? (
      <Box
        width={["85%", "25%", "25%"]}
        sx={{ variant: "jboldaGatsbyTheme.homepage.about.left" }}
      >
        <SiteLinks siteMetadata={site.siteMetadata} />
      </Box>
    ) : null}
    {!!about || !!about.childMdx || !!about.childMdx.body ? (
      <Box
        width={["85%", "65%", "65%"]}
        sx={{ variant: "jboldaGatsbyTheme.homepage.about.right" }}
      >
        <MDXRenderer scope={{ contextMDX }}>{about.childMdx.body}</MDXRenderer>
      </Box>
    ) : null}
  </Flex>
);

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
      const { theme } = useThemeUI();
      return (
        <WrapElement
          components={{
            ...mdxComponents({
              heading: "jboldaGatsbyTheme.homepage.about.heading",
              text: "jboldaGatsbyTheme.homepage.about.text"
            }),
            ...(!!theme &&
            !!theme.jboldaGatsbyTheme &&
            !!theme.jboldaGatsbyTheme.homepage &&
            !!theme.jboldaGatsbyTheme.homepage.about &&
            !!theme.jboldaGatsbyTheme.homepage.about.components
              ? theme.jboldaGatsbyTheme.homepage.about.components
              : {})
          }}
        >
          <About site={queryData.site} about={queryData.about} {...props} />
        </WrapElement>
      );
    }}
  />
);
