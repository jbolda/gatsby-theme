import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { useThemeUI, Flex, Box } from "theme-ui";
import { MDXProvider } from "@mdx-js/react";
import Img from "gatsby-image";
import { mdxComponents } from "@jbolda/gatsby-theme-components";

const Landing = ({ landing, profile }) => {
  const { theme } = useThemeUI();
  return (
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
          sx={{
            width: ["80%", "50%", "30%"],
            variant: "jboldaGatsbyTheme.homepage.landing.left"
          }}
        >
          <Img fluid={profile.childImageSharp.fluid} />
        </Box>
      )}
      {!landing || !landing.childMdx || !landing.childMdx.body ? null : (
        <Box
          sx={{
            width: ["80%", "50%", "30%"],
            variant: "jboldaGatsbyTheme.homepage.landing.right"
          }}
        >
          <MDXProvider
            components={
              theme?.jboldaGatsbyTheme?.homepage?.landing?.components === null
                ? null
                : {
                    ...mdxComponents({
                      heading: "jboldaGatsbyTheme.homepage.landing.heading",
                      text: "jboldaGatsbyTheme.homepage.landing.text"
                    }),
                    ...(!!theme?.jboldaGatsbyTheme?.homepage?.landing
                      ?.components
                      ? theme.jboldaGatsbyTheme.homepage.landing.components
                      : {})
                  }
            }
          >
            <MDXRenderer>{landing.childMdx.body}</MDXRenderer>
          </MDXProvider>
        </Box>
      )}
    </Flex>
  );
};

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
    render={queryData => {
      return (
        <Landing
          landing={queryData.landing}
          profile={queryData.profile}
          {...props}
        />
      );
    }}
  />
);
