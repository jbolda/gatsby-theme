import React from "react";
import ArticleLayout from "./articleLayout";
import FeaturedImage from "./components/featuredImage";
import ArticleSection from "./components/articleSection";

export default ({ article, location, children }) => (
  <ArticleLayout article={article} location={location}>
    <FeaturedImage featuredImage={article.featuredImage} />
    <ArticleSection article={article} children={children} />
  </ArticleLayout>
);
