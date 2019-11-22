import React from "react";
import { graphql } from "gatsby";
import Chrome from "../Chrome.js";

class BlogPostTemplate extends React.Component {
  render() {
    const { html } = this.props.data.post;

    return (
      <Chrome
        post={this.props.data.post}
        hero={this.props.data.post.frontmatter.heroImage}
        location={this.props.location}
      >
        <div
          className="content has-text-grey-dark"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Chrome>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query GatsbyThemeBulmaBlogBlogPostTemplatePostBySlugWithoutImage(
    $slug: String!
  ) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        path
        writtenPretty: written(formatString: "MMMM Do YYYY")
        updatedPretty: updated(formatString: "MMMM Do YYYY")
        written
        updated
        category
        description
      }
    }
  }
`;
