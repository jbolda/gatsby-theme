import React from "react";
import HeroLayout from "../components/HeroLayout";
import HeroArticles from "../components/HeroArticles";

const HeroTemplate = props => (
  <HeroLayout {...props}>
    <HeroArticles swatch="thirdary" />
    {props.children}
  </HeroLayout>
);

export default HeroTemplate;
