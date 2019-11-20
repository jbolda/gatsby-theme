import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Articles = ({ posts, pictures, swatch }) =>
  posts.edges.map(post => (
    <div className="column is-one-third" key={post.node.frontmatter.path}>
      <div className="card">
        <div className="card-image">
          {post.node.frontmatter.heroImage && pictures.edges ? (
            <Img
              className="image"
              Tag="figure"
              // fluid={
              //   sortThroughPictures(
              //     post.node.frontmatter.heroImage,
              //     pictures.edges
              //   ).childImageSharp.fluid
              // }
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
              <h5 className={`tag is-${swatch || "thirdary"} is-6 level-right`}>
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
  ));

export default Articles;

/*
export default props => (
  <StaticQuery
    query={graphql`
      query GatsbyThemeBulmaHomepageHeroArticles {
        posts: allBlogPost(limit: 6, sort: {fields: frontmatter___last, order: DESC}) {
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
                }
              }
            }
          }
        }
        pictures: allFile(
          filter: {
            sourceInstanceName: { eq: "articles" }
            extension: { eq: "jpg" }
          }
          limit: 6
        ) {
          edges {
            node {
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
    `}
    render={queryData => (
      <section className={`section is-${props.swatch || 'thirdary'} ${props.edge || 'edge--top'}`}>
        <h1 className="title">
          <Link to={'/articles/'}>
            Articles
          </Link>
        </h1>
        <h2 className="subtitle">The Most Recent</h2>
        <hr />
        <div className="columns is-multiline">
          <HeroArticles
            posts={queryData.posts}
            pictures={queryData.pictures}
            {...props}
          />
        </div>
        <p><Link to={'/articles/'}>Read More</Link></p>
      </section>
    )}
  />
);

const sortThroughPictures = (article, pictures) =>
  pictures.reduce(
    (finalVal, picture) =>
      finalVal ||
      (article && picture.node.base === article.base ? picture.node : finalVal),
    null
  );
*/
