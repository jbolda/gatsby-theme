import React from "react";
import Helmet from "react-helmet";

const HelmetBlock = ({ frontmatter, siteMetadata }) => {
  const whichSocialImage = !!frontmatter?.featuredImage?.fluid?.src
    ? frontmatter.featuredImage.fluid.src
    : frontmatter.socialImage;
  const socialImage = `${siteMetadata.siteURL}${whichSocialImage}`.replace(
    "//",
    "/"
  );
  return (
    <Helmet>
      <title>{`${siteMetadata.siteTitle} | ${frontmatter.title}`}</title>
      <meta name="description" content={frontmatter.excerpt} />
      {!!frontmatter.keywords ? (
        <meta name="keywords" content={frontmatter.keywords.join(", ")} />
      ) : null}
      <meta
        property="og:title"
        content={`${siteMetadata.siteTitle} | ${frontmatter.title}`}
      />
      <meta
        property="og:url"
        content={`${siteMetadata.siteURL}${frontmatter.slug}`}
      />
      {!whichSocialImage ? null : (
        <meta property="og:image" content={socialImage} />
      )}
      <meta property="og:description" content={frontmatter.excerpt} />
      <meta property="og:site_name" content={siteMetadata.siteTitle} />
      <meta property="og:type" content="article" />
      <meta property="og:article:author" content={siteMetadata.siteAuthor} />
      <meta
        property="og:article:published_time"
        content={frontmatter.written}
      />
      <meta property="og:article:modified_time" content={frontmatter.updated} />
      <meta property="og:article:tag" content={frontmatter.category} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" value={siteMetadata.siteURL} />
      {!whichSocialImage ? null : (
        <meta name="twitter:image" content={socialImage} />
      )}
      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content={frontmatter.category} />
      <meta name="twitter:label2" content="Written" />
      <meta name="twitter:data2" content={frontmatter.written} />
    </Helmet>
  );
};

export default HelmetBlock;
