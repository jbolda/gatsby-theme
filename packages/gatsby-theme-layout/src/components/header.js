import React, { useState } from "react";
import { Flex, Box, Text, Link } from "@jbolda/isolated-theme-ui-components";

const Header = props => {
  const [hamburgerActive, toggleHamburgerMenu] = useState(false);

  return (
    <Box
      as="header"
      width="98%"
      sx={{ margin: "0px", padding: "0px", flexShrink: 0 }}
    >
      <Flex as="nav" role="navigation" aria-label="main navigation">
        <Box sx={{ flexGrow: 1, padding: 0, margin: 2 }}>
          <Link to="/">
            {props.logo ? (
              <Logo
                icon={
                  !!props.logo.inverse && props.location.pathname !== "/"
                    ? props.logo.inverse
                    : props.logo.data
                }
                alt={props.logo.alt}
              />
            ) : (
              <Text>{props.siteMetadata.siteTitle}</Text>
            )}
          </Link>
        </Box>
        <Box width={null}>
          {!props.siteMetadata.navLinks ? null : (
            <button
              aria-label="menu"
              aria-expanded={hamburgerActive ? "true" : "false"}
              onClick={toggleHamburgerMenu}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              {hamburgerActive ? "true" : "false"}
            </button>
          )}
        </Box>
        {!props.siteMetadata.navLinks
          ? null
          : props.siteMetadata.navLinks[0].text === ""
          ? null
          : props.siteMetadata.navLinks.map(link => (
              <Box key={link.text} width={null} sx={{ padding: 0, margin: 2 }}>
                <Link to={link.url}>{link.text}</Link>
              </Box>
            ))}
      </Flex>
    </Box>
  );
};

export default Header;

const Logo = ({ icon, alt }) => (
  <img
    src={icon}
    alt={alt}
    style={{
      height: `50px`,
      maxHeight: `50px`,
      marginBottom: `0px`
    }}
  />
);
