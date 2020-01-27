import React from "react";
import { Heading as HeadingComponent, Text as TextComponent } from "theme-ui";

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
const body = ["p", "span", "div"];

export default ({ heading, text }) => {
  return {
    ...headings.reduce(
      (components, h) => ({
        ...components,
        [h]: props => (
          <HeadingComponent as={h} {...props} sx={{ variant: heading }} />
        )
      }),
      {}
    ),
    ...body.reduce(
      (components, b) => ({
        ...components,
        [b]: props => <TextComponent as={b} {...props} sx={{ variant: text }} />
      }),
      {}
    )
  };
};
