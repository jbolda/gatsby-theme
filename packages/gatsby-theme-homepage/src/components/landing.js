import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { contextMDX } from "@jbolda/isolated-theme-ui-components";
import Img from "gatsby-image";
import { Flex, Box } from "@jbolda/isolated-theme-ui-components";

const Landing = ({ landing, profile }) => (
  <Flex
    sx={{
      padding: 2,
      justifyContent: "space-evenly",
      variant: "jboldaGatsbyTheme.homepage.landing.container"
    }}
  >
    {!profile ||
    !profile.childImageSharp ||
    !profile.childImageSharp.fluid ? null : (
      <Box
        width={["80%", "50%", "30%"]}
        sx={{
          variant: "jboldaGatsbyTheme.homepage.landing.left"
        }}
      >
        <Img fluid={profile.childImageSharp.fluid} />
      </Box>
    )}
    {!landing || !landing.childMdx || !landing.childMdx.body ? null : (
      <Box
        width={["80%", "50%", "30%"]}
        sx={{
          variant: "jboldaGatsbyTheme.homepage.landing.right"
        }}
      >
        <MDXRenderer scope={{ contextMDX }}>
          {landing.childMdx.body}
        </MDXRenderer>
      </Box>
    )}
  </Flex>
);

export default props => (
  <StaticQuery
    query={graphql`
      query GatsbyThemeBulmaHomepageHeroLanding {
        landing: file(
          sourceInstanceName: { eq: "homepage" }
          name: { eq: "landing" }
        ) {
          childMdx {
            body
          }
        }
        profile: file(
          sourceInstanceName: { eq: "homepage" }
          name: { eq: "avatar" }
        ) {
          childImageSharp {
            fluid(maxWidth: 500, maxHeight: 500, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={queryData => (
      <Landing
        landing={queryData.landing}
        profile={queryData.profile}
        {...props}
      />
    )}
  />
);
