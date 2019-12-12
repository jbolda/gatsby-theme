import React from "react";
// import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Img } from "gatsby-image";
import { Flex, Box } from "@jbolda/isolated-theme-ui-components";

const Landing = ({ landing, profile }) => (
  <Flex>
    {!profile ||
    !profile.childImageSharp ||
    !profile.childImageSharp.fluid ? null : (
      <Box>
        <Img
          className="image"
          Tag="figure"
          fluid={profile.childImageSharp.fluid}
        />
      </Box>
    )}
    {!landing || !landing.childMdx || !landing.childMdx.body ? null : (
      <Box>
        <MDXRenderer>{landing.childMdx.body}</MDXRenderer>
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
        profile: file(relativePath: { eq: "avatar.png" }) {
          childImageSharp {
            fluid(maxWidth: 500, maxHeight: 500, quality: 90, grayscale: true) {
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
