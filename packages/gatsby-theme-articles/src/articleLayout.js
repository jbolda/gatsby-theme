import React from "react";
import { StaticQuery, graphql } from "gatsby";

class ArticleLayout extends React.Component {
  render() {
    let { siteMetadata } = this.props.site;

    return (
      <Nav site={this.props.site} location={this.props.location}>
        {this.props.children}
        <section className={`section is-${this.props.swatch || "primary"}`}>
          <hr />
          <div className="container">
            <p>
              {siteMetadata.siteDescription}
              <a href={siteMetadata.siteContact}>
                <br /> <strong>{siteMetadata.siteAuthor}</strong> on Twitter
              </a>
            </p>
          </div>
        </section>
      </Nav>
    );
  }
}

const Nav = ({ children }) => <div>{children}</div>;

export default props => (
  <StaticQuery
    query={graphql`
      query JBoldaGatsbyThemeBlogBlogPostLayout {
        site {
          siteMetadata {
            siteTitle
            siteAuthor
            siteDescription
            siteContact
          }
        }
      }
    `}
    render={queryData => <ArticleLayout site={queryData.site} {...props} />}
  />
);
