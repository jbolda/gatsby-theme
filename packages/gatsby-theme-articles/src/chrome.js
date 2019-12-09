import React from "react";
import { Box } from "@jbolda/isolated-theme-ui-components";
import ArticleLayout from "./articleLayout";
import ArticleSection from "./components/articleSection";
import Img from "gatsby-image";

export default ({ article, location, children }) => (
  <ArticleLayout article={article} location={location}>
    <FeaturedImage featuredImage={article.featuredImage} />
    <ArticleSection article={article} children={children} />
  </ArticleLayout>
);

const FeaturedImage = ({ featuredImage }) => {
  if (featuredImage) {
    return (
      <Box>
        <Img className="image" fluid={featuredImage.childImageSharp.fluid} />
      </Box>
    );
  } else {
    return null;
  }
};
