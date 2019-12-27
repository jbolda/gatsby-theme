import React from "react";
import { Box, Image } from "@jbolda/isolated-theme-ui-components";
import ArticleLayout from "./articleLayout";
import ArticleSection from "./components/articleSection";

export default ({ article, location, children }) => (
  <ArticleLayout article={article} location={location}>
    <FeaturedImage featuredImage={article.featuredImage} />
    <ArticleSection article={article} children={children} />
  </ArticleLayout>
);

const FeaturedImage = ({ featuredImage }) => {
  if (featuredImage) {
    return (
      <Box sx={{ width: "100%", padding: 0, margin: 0 }}>
        <Image
          sx={{
            maxHeight: "600px",
            variant: "jboldaGatsbyTheme.articles.article.featuredImage"
          }}
          fluid={featuredImage.fluid}
        />
      </Box>
    );
  } else {
    return null;
  }
};
