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
    <Link to={"/articles/"}>
      <Heading sx={{ marginBottom: "0px" }}>Articles</Heading>
    </Link>
    <Text>The Most Recent</Text>
    <Articles articles={props.articles} {...props} />
    <Link to={"/articles/"}>
      <Heading as="h3">Read More</Heading>
    </Link>
  </Flex>
);

// const sortThroughPictures = (article, pictures) =>
//   pictures.reduce(
//     (finalVal, picture) =>
//       finalVal ||
//       (article && picture.node.base === article.base ? picture.node : finalVal),
//     null
//   );
