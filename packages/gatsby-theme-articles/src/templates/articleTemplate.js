import React from "react";
import { graphql } from "gatsby";
import Chrome from "../chrome";

const ArticleTemplate = props => (
  <Chrome
    article={this.props.data.article}
    hero={this.props.data.article.frontmatter.heroImage}
    location={this.props.location}
  >
    <div
      className="content has-text-grey-dark"
      dangerouslySetInnerHTML={{ __html: this.props.data.article.html }}
    />
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
