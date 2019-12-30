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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
};

export default ArticleSection;
