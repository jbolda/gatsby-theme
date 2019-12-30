import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { contextMDX } from "@jbolda/isolated-theme-ui-components";
import { Flex, Box, Heading, Text } from "@jbolda/isolated-theme-ui-components";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Engagements = ({ engagements }) => (
  <Flex alignItems="flex-start">
    {!!engagements
      ? engagements.nodes.map(engagement => (
          <Box
            key={engagement.name}
            width={["85%", "45%", "30%"]}
            sx={{ variant: "jboldaGatsbyTheme.homepage.engagements.each" }}
          >
            <MDXRenderer scope={{ contextMDX }}>
              {engagement.childMdx.body}
            </MDXRenderer>
          </Box>
        ))
      : null}
  </Flex>
);

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
    render={queryData =>
      queryData.engagements.nodes.length === 0 ? null : (
        <Flex
          direction="column"
          alignItems="left"
          sx={{
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
      )
    }
  />
);
