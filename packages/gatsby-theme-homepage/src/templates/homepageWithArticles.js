import React from "react";
import Layout from "@jbolda/gatsby-theme-homepage/src/components/layout";
import Articles from "../components/articles";

const Homepage = props => (
  <Layout {...props}>
    <Articles swatch="thirdary" />
    {props.children}
  </Layout>
);

export default Homepage;
