import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { useThemeUI, Flex, Box, Heading, Text } from "theme-ui";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "@jbolda/isolated-theme-ui-components";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Engagements = ({ engagements }) => {
  const { theme } = useThemeUI();
  return (
    <Flex
      sx={{
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start"
      }}
    >
      <MDXProvider
        components={
          theme?.jboldaGatsbyTheme?.homepage?.engagements?.components === null
            ? null
            : {
                ...mdxComponents({
                  heading: "jboldaGatsbyTheme.homepage.engagements.heading",
                  text: "jboldaGatsbyTheme.homepage.engagements.text"
                }),
                ...(!!theme?.jboldaGatsbyTheme?.homepage?.engagements
                  ?.components
                  ? theme.jboldaGatsbyTheme.homepage.engagements.components
                  : {})
              }
        }
      >
        {!!engagements
          ? engagements.nodes.map(engagement => (
              <Box
                key={engagement.name}
                sx={{
                  padding: 2,
                  width: ["85%", "45%", "30%"],
                  variant: "jboldaGatsbyTheme.homepage.engagements.each"
                }}
              >
                <MDXRenderer>{engagement.childMdx.body}</MDXRenderer>
              </Box>
            ))
          : null}
      </MDXProvider>
    </Flex>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query jBoldaGatsbyThemeHomepageProfessionalEngagements {
        engagements: allFile(
          filter: {
            sourceInstanceName: { eq: "homepage" }
            relativeDirectory: { regex: "/engagements*/" }
            ext: { eq: ".mdx" }
          }
          sort: { fields: childMdx___frontmatter___order, order: ASC }
        ) {
          nodes {
            name
            childMdx {
              body
            }
          }
        }
      }
    `}
    render={queryData => {
      return queryData.engagements.nodes.length === 0 ? null : (
        <Flex
          sx={{
            flexDirection: "column",
            alignItems: "left",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: 4,
            variant: "jboldaGatsbyTheme.homepage.engagements.container"
          }}
        >
          <Heading
            as="h2"
            sx={{
              marginBottom: "0px",
              variant: "jboldaGatsbyTheme.homepage.engagements.heading"
            }}
          >
            Professional Engagements
          </Heading>
          <Text
            sx={{
              variant: "jboldaGatsbyTheme.homepage.engagements.text"
            }}
          >
            In View of the Public
          </Text>
          <Engagements engagements={queryData.engagements} {...props} />
        </Flex>
      );
    }}
  />
);
