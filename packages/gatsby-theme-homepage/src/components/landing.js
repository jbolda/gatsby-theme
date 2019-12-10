import React from "react";
// import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import { Flex, Box, Heading, Text } from "@jbolda/isolated-theme-ui-components";

const Landing = ({ profile, site }) => (
  <Flex>
    <Box>
      {/* <Img
            className="image"
            Tag="figure"
            fluid={profile.childImageSharp.fluid}
          /> */}
    </Box>
    <Box>
      <Heading as="h3">Hi, I am</Heading>
      <Heading>{site.siteMetadata.siteAuthor}</Heading>
      <Heading as="h2">{site.siteMetadata.siteAuthorIdentity}</Heading>
      <Text as="p">{site.siteMetadata.siteLanding}</Text>
    </Box>
  </Flex>
);

export default props => (
  <StaticQuery
    query={graphql`
      query GatsbyThemeBulmaHomepageHeroLanding {
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
      <Landing site={queryData.site} profile={queryData.profile} {...props} />
    )}
  />
);
