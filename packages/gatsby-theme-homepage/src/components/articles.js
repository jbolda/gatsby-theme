import React from "react";
import { Flex, Box, Heading, Text, Link } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";

const Articles = ({ articles }) => (
  <Flex
    sx={{
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: 2
    }}
  >
    {articles.nodes.map(article => (
      <Box
        key={article.slug}
        sx={{
          width: ["85%", "85%", "30%"],
          variant: "jboldaGatsbyTheme.homepage.articles.each"
        }}
      >
        <Flex
          sx={{
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <Box sx={{ width: "100%" }}>
            {article.tags.map(tag => (
              <Text
                sx={{ variant: "jboldaGatsbyTheme.homepage.articles.text" }}
              >
                {tag}
              </Text>
            ))}
          </Box>
          <Box sx={{ width: "100%", padding: 0 }}>
            <Link
              as={GatsbyLink}
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
          <Box sx={{ width: "100%", padding: 0 }}>
            <Text
              dangerouslySetInnerHTML={{
                __html: article.excerpt
              }}
              sx={{ variant: "jboldaGatsbyTheme.homepage.articles.text" }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Link
              as={GatsbyLink}
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
    sx={{
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "left",
      justifyContent: "center",
      padding: 4,
      variant: "jboldaGatsbyTheme.homepage.articles.container"
    }}
  >
    <Link
      as={GatsbyLink}
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
      as={GatsbyLink}
      to={"/articles/"}
      sx={{ variant: "jboldaGatsbyTheme.homepage.articles.link" }}
    >
      <Heading
        as="h3"
        sx={{ variant: "jboldaGatsbyTheme.homepage.articles.heading" }}
      >
        Read More
      </Heading>
    </Link>
  </Flex>
);
