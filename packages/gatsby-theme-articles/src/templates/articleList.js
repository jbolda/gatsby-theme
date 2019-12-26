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
      <Heading>Articles</Heading>
      <Flex sx={{ variant: "jboldaGatsbyTheme.articles.list.container" }}>
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
            <Text>{article.category}</Text>
            <Link to={article.slug}>
              <Heading as="h2">{article.title}</Heading>
            </Link>
            <p
              dangerouslySetInnerHTML={{
                __html: article.excerpt
              }}
            />
            <Link to={article.slug}>
              <Text>Read</Text>
            </Link>
          </Box>
        ))}
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
