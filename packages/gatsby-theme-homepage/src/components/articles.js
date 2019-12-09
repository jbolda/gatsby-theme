import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Link
} from "@jbolda/isolated-theme-ui-components";
// import Img from "gatsby-image";

const Articles = ({ articles }) => (
  <Flex direction="row">
    {articles.nodes.map(article => (
      <Box key={article.slug} width={["85%", "85%", "30%"]}>
        <Flex direction="column">
          <Box width="100%">{article.tags}</Box>
          <Box width="100%" sx={{ padding: 0 }}>
            <Link to={article.slug}>
              <Heading>{article.title}</Heading>
            </Link>
          </Box>
          <Box width="100%" sx={{ padding: 0 }}>
            <p
              dangerouslySetInnerHTML={{
                __html: article.excerpt
              }}
            />
          </Box>
          <Box width="100%">
            <Link to={article.slug}>
              <Text>Read</Text>
            </Link>
          </Box>
        </Flex>
      </Box>
    ))}
  </Flex>
);

export default props => (
  <Flex direction="column" alignItems="left">
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
