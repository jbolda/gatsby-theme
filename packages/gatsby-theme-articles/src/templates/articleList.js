import React from "react";
import { graphql } from "gatsby";
import Nav from "../components/nav";
import Img from "gatsby-image";
import { Flex, Box, Heading, Text, Link } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";

export default (props) => {
  return (
    <Nav {...props}>
      <Flex
        sx={{
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          variant: "jboldaGatsbyTheme.articles.list.container",
        }}
      >
        <Heading
          sx={{
            textTransform: "capitalize",
            variant: "jboldaGatsbyTheme.articles.list.heading",
          }}
        >
          {props.pageContext.contentPath}
        </Heading>
        <Flex
          sx={{
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.data.articles.nodes.map((article) => (
            <Box
              key={article.slug}
              sx={{
                width: ["95%", "85%", "60%"],
                variant: "jboldaGatsbyTheme.articles.list.each",
              }}
            >
              {article.heroImage ? (
                <Img
                  className="image"
                  Tag="figure"
                  fluid={article.heroImage.childImageSharp.fluid}
                />
              ) : null}
              <Link
                as={GatsbyLink}
                sx={{
                  variant: "jboldaGatsbyTheme.articles.list.link",
                }}
              >
                {article.category}
              </Link>
              <Link
                as={GatsbyLink}
                to={article.slug}
                sx={{
                  variant: "jboldaGatsbyTheme.articles.list.link",
                }}
              >
                <Heading
                  as="h2"
                  sx={{
                    variant: "jboldaGatsbyTheme.articles.list.heading",
                  }}
                >
                  {article.title}
                </Heading>
              </Link>
              <Text
                dangerouslySetInnerHTML={{
                  __html: article.excerpt,
                }}
                sx={{
                  variant: "jboldaGatsbyTheme.articles.list.text",
                }}
              />
              <Link
                as={GatsbyLink}
                to={article.slug}
                sx={{
                  variant: "jboldaGatsbyTheme.articles.list.link",
                }}
              >
                Read
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Nav>
  );
};

export const pageQuery = graphql`
  query JboldaGatsbyThemeArticleListQuery($contentPath: String!) {
    articles: allArticles(
      filter: { contentPath: { eq: $contentPath } }
      sort: { fields: written, order: DESC }
    ) {
      nodes {
        excerpt
        keywords
        tags
        title
        updated
        written
        slug
      }
    }
  }
`;
