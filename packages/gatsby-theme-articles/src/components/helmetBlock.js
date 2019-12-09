import React from "react";
import Helmet from "react-helmet";

const HelmetBlock = ({ frontmatter }) => (
  <Helmet>
    <title>{`${frontmatter.title} | Jacob Bolda`}</title>
    <meta name="description" content={frontmatter.excerpt} />
    <meta property="og:title" content={`${frontmatter.title} | Jacob Bolda`} />
    <meta
      property="og:url"
      content={`https://www.jacobbolda.com/${frontmatter.slug}`}
    />
    <meta property="og:description" content={frontmatter.excerpt} />
    <meta property="og:site_name" content="Jacob Bolda" />
    <meta property="og:type" content="article" />
    <meta property="og:article:author" content="Jacob Bolda" />
    <meta property="og:article:published_time" content={frontmatter.written} />
    <meta property="og:article:modified_time" content={frontmatter.updated} />
    <meta property="og:article:tag" content={frontmatter.category} />
    <meta property="twitter:label1" content="Category" />
    <meta property="twitter:data1" content={frontmatter.category} />
    <meta property="twitter:label2" content="Written" />
    <meta property="twitter:data2" content={frontmatter.written} />
  </Helmet>
);

export default HelmetBlock;
