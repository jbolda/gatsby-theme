import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Flex, Box } from "@jbolda/isolated-theme-ui-components";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SiteLinks from "./siteLinks";

const About = ({ site, about }) => (
  <Flex>
    {!!site && !!site.siteMetadata && !!site.siteMetadata.contactLinks ? (
      <Box width={["85%", "25%", "25%"]}>
        <SiteLinks siteMetadata={site.siteMetadata} />
      </Box>
    ) : null}
    {!!about && !!about.body ? (
      <Box width={["85%", "65%", "65%"]}>
        <MDXRenderer>{about.body}</MDXRenderer>
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
            siteAuthorIdentity
            siteLanding
            contactLinks {
              text
              url
              icon
            }
          }
        }
        about: mdx(frontmatter: { title: { eq: "About Me" } }) {
          body
        }
      }
    `}
    render={queryData => (
      <About site={queryData.site} about={queryData.about} {...props} />
    )}
  />
);
