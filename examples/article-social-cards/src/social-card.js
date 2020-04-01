import React from "react";
import PrinterComponent from "@jbolda/gatsby-theme-articles/src/components/printer-article";

export default ({ frontmatter }) => (
  <PrinterComponent
    frontmatter={frontmatter}
    borderColor="blue"
    backgroundColor="yellow"
    textColor="black"
  />
);
