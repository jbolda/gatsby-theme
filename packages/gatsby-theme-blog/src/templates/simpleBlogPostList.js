import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

class BlogPostList extends React.Component {
  render() {
    return (
      <Nav {...this.props}>
        <div className="hero is-small is-thirdary edge--bottom--reverse">
          <div className="hero-body">
            <div className="columns is-centered is-vcentered">
              <div className="column is-one-third content">
                <p className="title">Articles</p>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="columns is-multiline">
            {this.props.data.posts.edges.map(post => (
              <div
                className="column is-one-third"
                key={post.node.frontmatter.path}
              >
                <div className="card">
                  <div className="card-image">
                    {post.node.frontmatter.heroImage ? (
                      <Img
                        className="image"
                        Tag="figure"
                        fluid={
                          post.node.frontmatter.heroImage.childImageSharp.fluid
                        }
                      />
                    ) : null}
                  </div>
                  <div className="card-content">
                    <div className="heading">
                      <div className="level">
                        <h4 className="level-left">
                          <time
                            className="subtitle is-6"
                            dateTime={
                              post.node.frontmatter.updatedPretty ||
                              post.node.frontmatter.writtenPretty
                            }
                          >
                            {post.node.frontmatter.updatedPretty ||
                              post.node.frontmatter.writtenPretty}
                          </time>
                        </h4>
                        <h5
                          className={`tag is-${this.props.swatch ||
                            "thirdary"} is-6 level-right`}
                        >
                          {post.node.frontmatter.category}
                        </h5>
                      </div>
                      <h1 className="title">
                        <Link to={post.node.frontmatter.path}>
                          {post.node.frontmatter.title}
                        </Link>
                      </h1>
                    </div>
                    <div className="content">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.node.frontmatter.description
                        }}
                      />
                    </div>
                    <nav className="level">
                      <div className="level-left">
                        <span className="level-item">
                          <Link to={post.node.frontmatter.path}>Read</Link>
                        </span>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Nav>
    );
  }
}

export default BlogPostList;

const Nav = ({ children }) => <div>{children}</div>;

export const pageQuery = graphql`
  query BlogPostListQuery {
    posts: allBlogPost(sort: { fields: frontmatter___last, order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            path
            written
            writtenPretty: written(formatString: "MMMM D, YYYY")
            updated
            updatePretty: updated(formatString: "MMMM D, YYYY")
            category
            description
            heroImage {
              base
              childImageSharp {
                fluid(
                  maxWidth: 600
                  maxHeight: 350
                  quality: 100
                  cropFocus: ATTENTION
                ) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
