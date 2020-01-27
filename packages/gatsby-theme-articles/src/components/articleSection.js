import React from "react";
import { Box } from "theme-ui";

const ArticleSection = ({
  componentOverride,
  componentBlocks,
  article,
  children
}) => {
  if (componentOverride) {
    return componentOverride();
  } else {
    return !componentBlocks ? (
      <Box
        sx={{
          width: ["95%", "85%", "50%"],
          padding: 3,
          variant: "jboldaGatsbyTheme.articles.article.content"
        }}
      >
        {children}
      </Box>
    ) : (
      componentBlocks.map(block => (
        <Box
          key={block.uniqueKey}
          sx={{
            width: ["95%", "85%", "50%"],
            padding: 3,
            variant: "jboldaGatsbyTheme.articles.article.content"
          }}
        >
          {block.renderComponent()}
        </Box>
      ))
    );
  }
};

export default ArticleSection;
