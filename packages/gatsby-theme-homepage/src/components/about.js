import React from "react";
import { StaticQuery, graphql } from "gatsby";

const About = ({ site, about, swatch }) => (
  <section className={`hero is-${swatch || "secondary"} is-medium`}>
    <div className="hero-body">
      <div className="columns">
        <div className="column is-one-quarter">
          <SiteLinks site={site} />
        </div>
        <div className="column">
          <div
            className="content"
            // dangerouslySetInnerHTML={{
            //   __html: about.childMarkdownRemark.html
            // }}
          />
        </div>
      </div>
    </div>
  </section>
);

export default props => (
  <StaticQuery
    query={graphql`
      query jBoldaGatsbyThemeHomepageAbout {
        site {
          siteMetadata {
            siteAuthor
            siteAuthorIdentity
            siteLanding
            contactLinks {
              text
              url
              icon
            }
          }
        }
      }
    `}
    render={queryData => (
      <About site={queryData.site} about={queryData.about} {...props} />
    )}
  />
);

const SiteLinks = ({ children }) => <div>{children}</div>;
