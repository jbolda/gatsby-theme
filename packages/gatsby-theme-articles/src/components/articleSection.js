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
  } else if (componentBlocks) {
    return (
      <Flex direction="column">
        <Box>
          <Heading>{article.title}</Heading>
        </Box>
        {componentBlocks.map(block => {
          if (block.wrapper === "break-out") {
            return <Box key={block.uniqueKey}>{block.renderComponent()}</Box>;
          } else {
            return <Box key={block.uniqueKey}>{block.renderComponent()}</Box>;
          }
        })}
      </Flex>
    );
  } else {
    return (
      <Flex direction="column">
        <Box>
          <Heading>{article.title}</Heading>
        </Box>
        {console.log(children)}
        <Box>{children}</Box>
      </Flex>
    );
  }
};

export default ArticleSection;
