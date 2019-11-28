import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Flex from "@jbolda/isolated-theme-ui-components/src/components/flex";
import Box from "@jbolda/isolated-theme-ui-components/src/components/box";
import Heading from "@jbolda/isolated-theme-ui-components/src/components/heading";

const ArticleList = props => {
  return (
    <Nav {...props}>
      <Heading>Articles</Heading>
      <Flex>
        {props.data.articles.nodes.map(article => (
          <Box key={article.slug}>
            <div className="card">
              <div className="card-image">
                {article.heroImage ? (
                  <Img
                    className="image"
                    Tag="figure"
                    fluid={article.heroImage.childImageSharp.fluid}
                  />
                ) : null}
              </div>
              <div className="card-content">
                <div className="heading">
                  <div className="level">
                    <h5
                      className={`tag is-${props.swatch ||
                        "thirdary"} is-6 level-right`}
                    >
                      {article.category}
                    </h5>
                  </div>
                  <h1 className="title">
                    <Link to={article.slug}>{article.title}</Link>
                  </h1>
                </div>
                <div className="content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: article.description
                    }}
                  />
                </div>
                <nav className="level">
                  <div className="level-left">
                    <span className="level-item">
                      <Link to={article.slug}>Read</Link>
                    </span>
                  </div>
                </nav>
              </div>
            </div>
          </Box>
        ))}
      </Flex>
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
        slug
      }
    }
  }
`;
