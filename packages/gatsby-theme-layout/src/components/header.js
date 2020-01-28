import React, { useState, useRef } from "react";
import { Flex, Box, Text, Link, MenuButton, Close } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";
import { useClickAway } from "react-use";
import ColorToggle from "./colorToggle";

const Header = props => {
  const [hamburgerActive, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => setHamburgerMenu(!hamburgerActive);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setHamburgerMenu(false);
  });

  return (
    <Box
      as="header"
      sx={{
        width: "98%",
        margin: "0px",
        padding: "0px",
        flexShrink: 0,
        variant: "jboldaGatsbyTheme.layout.header"
      }}
    >
      <div ref={ref}>
        <Flex
          as="nav"
          role="navigation"
          aria-label="main navigation"
          sx={{
            alignItems: "stretch",
            flexWrap: "wrap",
            justifyContent: ["flex-start", "flex-end", "flex-end"]
          }}
        >
          <Box sx={{ flexGrow: [1, 0, 0], padding: 0, margin: 2 }}>
            <Link
              as={GatsbyLink}
              to="/"
              sx={{
                variant: "jboldaGatsbyTheme.layout.link"
              }}
            >
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
                <Text
                  sx={{
                    variant: "jboldaGatsbyTheme.layout.text"
                  }}
                >
                  {props.siteMetadata.siteTitle}
                </Text>
              )}
            </Link>
          </Box>
          {!props.siteMetadata.navLinks ||
          props.siteMetadata.navLinks[0].text === "" ? null : (
            <Box sx={{ flexGrow: [0, 1, 1], padding: 0, margin: 0 }}>
              <Flex
                sx={{
                  flexDirection: ["column", "row", "row"],
                  alignItems: "flex-end",
                  justifyContent: "flex-end"
                }}
              >
                <MenuButton
                  aria-label="toggle menu"
                  aria-expanded={hamburgerActive ? "true" : "false"}
                  onClick={toggleHamburgerMenu}
                  sx={{
                    display: [
                      hamburgerActive ? "none" : "flex",
                      "none",
                      "none"
                    ],
                    margin: 2
                  }}
                />
                <Close
                  aria-label="toggle menu"
                  aria-expanded={hamburgerActive ? "true" : "false"}
                  onClick={toggleHamburgerMenu}
                  sx={{
                    display: hamburgerActive ? "flex" : "none",
                    margin: 2
                  }}
                />
                {props.siteMetadata.navLinks.map(link => (
                  <Box
                    key={link.text}
                    sx={{
                      display: [
                        hamburgerActive ? "flex" : "none",
                        "flex",
                        "flex"
                      ],
                      padding: 0,
                      margin: 2
                    }}
                  >
                    <Link
                      as={GatsbyLink}
                      to={link.url}
                      sx={{
                        variant: "jboldaGatsbyTheme.layout.link"
                      }}
                    >
                      <Text
                        sx={{
                          variant: "jboldaGatsbyTheme.layout.text"
                        }}
                      >
                        {link.text}
                      </Text>
                    </Link>
                  </Box>
                ))}
                <ColorToggle hamburgerActive={hamburgerActive} />
              </Flex>
            </Box>
          )}
        </Flex>
      </div>
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
