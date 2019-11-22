import React from "react";
import Helmet from "react-helmet";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

const MasterLayout = ({ siteMetadata, children }) => (
  <div className="MasterLayout is-light">
    <Helmet
      defaultTitle={siteMetadata.siteTitle}
      title={siteMetadata.siteTitle}
      meta={[
        { name: `description`, content: siteMetadata.siteDescription },
        { name: `keywords`, content: `articles` }
      ]}
    ></Helmet>
    {children}
  </div>
);
export default MasterLayout;
