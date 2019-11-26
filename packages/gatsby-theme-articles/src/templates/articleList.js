import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

const ArticleList = props => {
  return (
    <Nav {...props}>
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
          {props.data.articles.nodes.map(article => (
            <div className="column is-one-third" key={article.frontmatter.path}>
              <div className="card">
                <div className="card-image">
                  {article.frontmatter.heroImage ? (
                    <Img
                      className="image"
                      Tag="figure"
                      fluid={
                        article.frontmatter.heroImage.childImageSharp.fluid
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
                            article.frontmatter.updatedPretty ||
                            article.frontmatter.writtenPretty
                          }
                        >
                          {article.frontmatter.updatedPretty ||
                            article.frontmatter.writtenPretty}
                        </time>
                      </h4>
                      <h5
                        className={`tag is-${props.swatch ||
                          "thirdary"} is-6 level-right`}
                      >
                        {article.frontmatter.category}
                      </h5>
                    </div>
                    <h1 className="title">
                      <Link to={article.frontmatter.path}>
                        {article.frontmatter.title}
                      </Link>
                    </h1>
                  </div>
                  <div className="content">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: article.frontmatter.description
                      }}
                    />
                  </div>
                  <nav className="level">
                    <div className="level-left">
                      <span className="level-item">
                        <Link to={article.frontmatter.path}>Read</Link>
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
};

export default ArticleList;

const Nav = ({ children }) => <div>{children}</div>;

export const pageQuery = graphql`
  query JboldaGatsbyThemeArticleListQuery {
    articles: allArticles(sort: { fields: written, order: DESC }) {
      nodes {
        body
        keywords
        tags
        title
        updated
        written
      }
    }
  }
`;
