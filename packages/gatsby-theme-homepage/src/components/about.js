import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { contextMDX } from "@jbolda/isolated-theme-ui-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Flex, Box } from "@jbolda/isolated-theme-ui-components";
import SiteLinks from "./siteLinks";

const About = ({ site, about }) => (
  <Flex>
    {!!site || !!site.siteMetadata || !!site.siteMetadata.contactLinks ? (
      <Box width={["85%", "25%", "25%"]}>
        <SiteLinks siteMetadata={site.siteMetadata} />
      </Box>
    ) : null}
    {!!about || !!about.childMdx || !!about.childMdx.body ? (
      <Box width={["85%", "65%", "65%"]}>
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
    render={queryData => (
      <About site={queryData.site} about={queryData.about} {...props} />
    )}
  />
);
