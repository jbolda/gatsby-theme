import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Flex, Box, Heading, Link } from "@jbolda/isolated-theme-ui-components";
// import Img from "gatsby-image";

const Articles = ({ articles, swatch }) =>
  articles.nodes.map(article => (
    <Box key={article.slug}>
      <div className="card">
        <div className="card-image"></div>
        <div className="card-content">
          <div className="heading">
            <div className="level">
              <h4 className="level-left">
                <time
                  className="subtitle is-6"
                  dateTime={article.updated || article.written}
                >
                  {article.updated || article.written}
                </time>
              </h4>
              <h5 className={`tag is-${swatch || "thirdary"} is-6 level-right`}>
                {article.tags}
              </h5>
            </div>
            <h1 className="title">
              <Link to={article.slug}>{article.title}</Link>
            </h1>
          </div>
          <div className="content">
            <p
              dangerouslySetInnerHTML={{
                __html: article.excerpt
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
  ));

export default props => (
  <Flex>
    <Heading>
      <Link to={"/articles/"}>Articles</Link>
    </Heading>
    <Heading as="h2">The Most Recent</Heading>
    <Articles articles={props.articles} {...props} />
    <Heading as="h3">
      <Link to={"/articles/"}>Read More</Link>
    </Heading>
  </Flex>
);

// const sortThroughPictures = (article, pictures) =>
//   pictures.reduce(
//     (finalVal, picture) =>
//       finalVal ||
//       (article && picture.node.base === article.base ? picture.node : finalVal),
//     null
//   );
