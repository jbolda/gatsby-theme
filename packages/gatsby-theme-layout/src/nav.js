import React from "react";
import { StaticQuery, graphql } from "gatsby";
import MasterLayout from "./masterLayout";
import Header from "./components/header";
import Footer from "./components/footer";
import { Box } from "@jbolda/isolated-theme-ui-components";

const Nav = ({ location, site, children, logo }) => (
  <MasterLayout siteMetadata={site.siteMetadata} id="layout">
    <Header siteMetadata={site.siteMetadata} location={location} logo={logo} />
    <Box
      width="100%"
      sx={{
        padding: 0,
        margin: 1,
        flex: "1 1 auto",
        variant: "jboldaGatsbyTheme.layout.content"
      }}
    >
      {children}
    </Box>
    <Footer site={site} />
  </MasterLayout>
);

export default props => (
  <StaticQuery
    query={graphql`
      query JBoldaGatsbyThemeLayoutNav {
        site {
          siteMetadata {
            siteTitle
            siteAuthor
            siteDescription
            siteContact
            navLinks {
              text
              url
            }
          }
        }
      }
    `}
    render={queryData => <Nav site={queryData.site} {...props} />}
  />
);
