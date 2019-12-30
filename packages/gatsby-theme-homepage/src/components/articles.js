import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Link
} from "@jbolda/isolated-theme-ui-components";

const Articles = ({ articles }) => (
  <Flex
    direction="row"
    alignItems="flex-start"
    sx={{
      padding: 2
    }}
  >
    {articles.nodes.map(article => (
      <Box
        key={article.slug}
        width={["85%", "85%", "30%"]}
        sx={{ variant: "jboldaGatsbyTheme.homepage.articles.each" }}
      >
        <Flex direction="column">
          <Box width="100%">
            {article.tags.map(tag => (
              <Text
                sx={{ variant: "jboldaGatsbyTheme.homepage.articles.text" }}
              >
                {tag}
              </Text>
            ))}
          </Box>
          <Box width="100%" sx={{ padding: 0 }}>
            <Link
              to={article.slug}
              sx={{ variant: "jboldaGatsbyTheme.homepage.articles.link" }}
            >
              <Heading
                as="h3"
                sx={{ variant: "jboldaGatsbyTheme.homepage.articles.heading" }}
              >
                {article.title}
              </Heading>
            </Link>
          </Box>
          <Box width="100%" sx={{ padding: 0 }}>
            <Text
              dangerouslySetInnerHTML={{
                __html: article.excerpt
              }}
              sx={{ variant: "jboldaGatsbyTheme.homepage.articles.text" }}
            />
          </Box>
          <Box width="100%">
            <Link
              to={article.slug}
              sx={{ variant: "jboldaGatsbyTheme.homepage.articles.link" }}
            >
              <Text
                sx={{ variant: "jboldaGatsbyTheme.homepage.articles.text" }}
              >
                Read
              </Text>
            </Link>
          </Box>
        </Flex>
      </Box>
    ))}
  </Flex>
);

export default props => (
  <Flex
    direction="column"
    alignItems="left"
    sx={{
      padding: 4,
      variant: "jboldaGatsbyTheme.homepage.articles.container"
    }}
  >
    <Link
      to={"/articles/"}
      sx={{ variant: "jboldaGatsbyTheme.homepage.articles.link" }}
    >
      <Heading
        as="h2"
        sx={{
          marginBottom: "0px",
          variant: "jboldaGatsbyTheme.homepage.articles.heading"
        }}
      >
        Articles
      </Heading>
    </Link>
    <Text sx={{ variant: "jboldaGatsbyTheme.homepage.articles.text" }}>
      The Most Recent
    </Text>
    <Articles articles={props.articles} {...props} />
    <Link
      to={"/articles/"}
      sx={{ variant: "jboldaGatsbyTheme.homepage.articles.link" }}
    >
      <Heading
        as="h4"
        sx={{ variant: "jboldaGatsbyTheme.homepage.articles.heading" }}
      >
        Read More
      </Heading>
    </Link>
  </Flex>
);
