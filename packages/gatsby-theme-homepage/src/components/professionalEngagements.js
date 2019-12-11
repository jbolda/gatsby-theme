import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Flex, Box } from "@jbolda/isolated-theme-ui-components";
import { MDXRenderer } from "gatsby-plugin-mdx";

const Engagements = ({ engagements }) => (
  <Flex alignItems="flex-start">
    {!!engagements
      ? engagements.nodes.map(engagement => (
          <Box key={engagement.name} width={["85%", "45%", "30%"]}>
            <MDXRenderer>{engagement.childMdx.body}</MDXRenderer>
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
          filter: { sourceInstanceName: { eq: "professionalEngagements" } }
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
    render={queryData => (
      <Engagements engagements={queryData.engagements} {...props} />
    )}
  />
);
