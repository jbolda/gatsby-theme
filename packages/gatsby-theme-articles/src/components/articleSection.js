import React from "react";
import { Box } from "@jbolda/isolated-theme-ui-components";

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
    );
  }
};

export default ArticleSection;
