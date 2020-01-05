import React from "react";
import { Box, Heading } from "@jbolda/isolated-theme-ui-components";

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
          <Heading
            sx={{ variant: "jboldaGatsbyTheme.articles.article.heading" }}
          >
            {article.title}
          </Heading>
        </Box>
        {!componentBlocks
          ? children
          : componentBlocks.map(block => block.renderComponent())}
      </React.Fragment>
    );
  }
};

export default ArticleSection;
