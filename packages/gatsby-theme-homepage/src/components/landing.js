import React from "react";
// import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";

const Landing = ({ profile, site, swatch, textColor }) => (
  <section className={`hero is-small is-${swatch || "primary"} edge--bottom`}>
    <div className="hero-body">
      <div className="columns is-centered is-vcentered">
        <div className="column is-one-third">
          {/* <Img
            className="image"
            Tag="figure"
            fluid={profile.childImageSharp.fluid}
          /> */}
        </div>
        <div className="column">
          <div className="columns is-centered">
            <div className="column is-half">
              <h3 className={`subtitle ${textColor || "has-text-thirdary"}`}>
                Hi, I am
              </h3>
              <h1 className={`title ${textColor || "has-text-thirdary"}`}>
                {site.siteMetadata.siteAuthor}
              </h1>
              <h2 className={`subtitle ${textColor || "has-text-thirdary"}`}>
                {site.siteMetadata.siteAuthorIdentity}
              </h2>
              <div className={`${textColor || "has-text-thirdary"}`}>
                <p>{site.siteMetadata.siteLanding}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default props => (
  <StaticQuery
    query={graphql`
      query GatsbyThemeBulmaHomepageHeroLanding {
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
        profile: file(relativePath: { eq: "avatar.png" }) {
          childImageSharp {
            fluid(maxWidth: 500, maxHeight: 500, quality: 90, grayscale: true) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={queryData => (
      <Landing site={queryData.site} profile={queryData.profile} {...props} />
    )}
  />
);
