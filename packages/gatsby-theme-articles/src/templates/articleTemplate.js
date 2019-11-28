import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Chrome from "../chrome";

const ArticleTemplate = ({ data, location }) => (
  <Chrome
    article={data.article}
    hero={data.article.heroImage}
    location={location}
  >
    <MDXRenderer>{data.article.body}</MDXRenderer>
  </Chrome>
);

export default ArticleTemplate;

export const pageQuery = graphql`
  query JBoldaGatsbyThemeArticleBySlugWithImage($slug: String!) {
    article: articles(slug: { eq: $slug }) {
      body
      keywords
      slug
      tags
      title
      updated
      written
    }
  }
`;

/*
        heroImage {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
*/
