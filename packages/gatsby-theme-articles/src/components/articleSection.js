import React from "react";
import { Flex, Box, Heading } from "@jbolda/isolated-theme-ui-components";

const ArticleSection = ({
  componentOverride,
  componentBlocks,
  article,
  children
}) => {
  if (componentOverride) {
    return componentOverride();
  } else {
    return (
      <Flex
        direction="column"
        sx={{ variant: "jboldaGatsbyTheme.articles.article.container" }}
      >
        <Box>
          <Heading>{article.title}</Heading>
        </Box>
        {!componentBlocks ? (
          <Box sx={{ variant: "jboldaGatsbyTheme.articles.article.content" }}>
            {children}
          </Box>
        ) : (
          componentBlocks.map(block => (
            <Box
              key={block.uniqueKey}
              sx={{ variant: "jboldaGatsbyTheme.articles.article.content" }}
            >
              {block.renderComponent()}
            </Box>
          ))
        )}
      </Flex>
    );
  }
};

export default ArticleSection;
