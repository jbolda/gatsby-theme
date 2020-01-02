import React from "react";
import { graphql } from "gatsby";
import Nav from "@jbolda/gatsby-theme-layout";
import Img from "gatsby-image";
import {
  Flex,
  Box,
  Heading,
  Text,
  Link
} from "@jbolda/isolated-theme-ui-components";

export default props => {
  return (
    <Nav {...props}>
      <Flex
        sx={{
          padding: 2,
          variant: "jboldaGatsbyTheme.articles.list.container"
        }}
      >
        <Heading
          sx={{
            variant: "jboldaGatsbyTheme.articles.list.heading"
          }}
        >
          Articles
        </Heading>
        <Flex>
          {props.data.articles.nodes.map(article => (
            <Box
              key={article.slug}
              sx={{ variant: "jboldaGatsbyTheme.articles.list.each" }}
            >
              {article.heroImage ? (
                <Img
                  className="image"
                  Tag="figure"
                  fluid={article.heroImage.childImageSharp.fluid}
                />
              ) : null}
              <Text
                sx={{
                  variant: "jboldaGatsbyTheme.articles.list.text"
                }}
              >
                {article.category}
              </Text>
              <Link
                to={article.slug}
                sx={{
                  variant: "jboldaGatsbyTheme.articles.list.link"
                }}
              >
                <Heading
                  as="h2"
                  sx={{
                    variant: "jboldaGatsbyTheme.articles.list.heading"
                  }}
                >
                  {article.title}
                </Heading>
              </Link>
              <Text
                dangerouslySetInnerHTML={{
                  __html: article.excerpt
                }}
                sx={{
                  variant: "jboldaGatsbyTheme.articles.list.text"
                }}
              />
              <Link
                to={article.slug}
                sx={{
                  variant: "jboldaGatsbyTheme.articles.list.link"
                }}
              >
                <Text
                  sx={{
                    variant: "jboldaGatsbyTheme.articles.list.text"
                  }}
                >
                  Read
                </Text>
              </Link>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Nav>
  );
};

export const pageQuery = graphql`
  query JboldaGatsbyThemeArticleListQuery {
    articles: allArticles(sort: { fields: written, order: DESC }) {
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
