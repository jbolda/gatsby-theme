import React from "react";
import Helmet from "react-helmet";
import { Flex } from "@jbolda/isolated-theme-ui-components";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

const MasterLayout = ({ siteMetadata, children }) => (
  <Flex direction="column" sx={{ minHeight: "100vh" }}>
    <Helmet defaultTitle={siteMetadata.siteTitle}>
      <title>{siteMetadata.siteTitle}</title>
      <meta property="description" content={siteMetadata.siteDescription} />
      <meta property="keywords" content="articles" />
      <style type="text/css">{`
        body {
            margin: 0px;
            padding: 0px;
        }
    `}</style>
    </Helmet>
    {children}
  </Flex>
);

export default MasterLayout;
