import React from "react";
import { Box } from "@jbolda/isolated-theme-ui-components";
import ArticleLayout from "./articleLayout";
import HelmetBlock from "./components/helmetBlock";
import ArticleSection from "./components/articleSection";
import Img from "gatsby-image";

export default ({ article, location, children }) => (
  <ArticleLayout location={location}>
    <FeaturedImage featuredImage={article.featuredImage} />
    <ArticleSection article={article} children={children} />
    <HelmetBlock frontmatter={article} />
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
