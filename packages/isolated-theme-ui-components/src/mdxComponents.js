import React from "react";
import Text from "./components/text";
import Heading from "./components/heading";

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
const body = ["p", "span", "div"];

export default ({ heading, text }) => {
  return {
    ...headings.map(h => ({
      [h]: props => <Heading {...props} sx={{ variant: heading }} />
    })),
    ...body.map(b => ({
      [b]: props => <Text {...props} sx={{ variant: text }} />
    }))
  };
};
