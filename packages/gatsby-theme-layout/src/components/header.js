import React, { useState, useRef } from "react";
import {
  Flex,
  Box,
  Text,
  Link,
  Button
} from "@jbolda/isolated-theme-ui-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClickAway } from "react-use";
import { useThemeUI, useColorMode } from "theme-ui";

const Header = props => {
  const [hamburgerActive, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => setHamburgerMenu(!hamburgerActive);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setHamburgerMenu(false);
  });

  const { theme } = useThemeUI();

  const themeModes =
    !!theme && !!theme.colors && !!theme.colors.modes
      ? [
          !!theme && !!theme.initialColorMode
            ? theme.initialColorMode
            : "default"
        ]
          .concat(Object.keys(theme.colors.modes))
          .reduce((modes, mode, index, array) => {
            return {
              ...modes,
              [mode]: {
                name: mode,
                next: array[index + 1 > array.length - 1 ? 0 : index + 1]
              }
            };
          }, {})
      : {};

  const [colorMode, setColorMode] = useColorMode();

  return (
    <Box
      as="header"
      width="98%"
      sx={{
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
          alignItems="stretch"
          sx={{ justifyContent: ["flex-start", "flex-end", "flex-end"] }}
        >
          <Box width={null} sx={{ flexGrow: [1, 0, 0], padding: 0, margin: 2 }}>
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
          {!props.siteMetadata.navLinks ||
          props.siteMetadata.navLinks[0].text === "" ? null : (
            <Box
              width={null}
              sx={{ flexGrow: [0, 1, 1], padding: 0, margin: 0 }}
            >
              <Flex
                direction={["column", "row", "row"]}
                alignItems="flex-end"
                sx={{
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  aria-label="menu"
                  aria-expanded={hamburgerActive ? "true" : "false"}
                  onClick={toggleHamburgerMenu}
                  sx={{
                    borderStyle: "none",
                    backgroundColor: "inherit",
                    display: ["flex", "none", "none"],
                    margin: 2
                  }}
                >
                  <FontAwesomeIcon icon={["fas", "bars"]} />
                </Button>
                {props.siteMetadata.navLinks.map(link => (
                  <Box
                    key={link.text}
                    width={null}
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
                    <Link to={link.url}>
                      <Text>{link.text}</Text>
                    </Link>
                  </Box>
                ))}
                <Box
                  width={null}
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
                  <Button
                    aria-label="menu"
                    sx={{
                      backgroundColor: "inherit",
                      borderStyle: "groove",
                      borderColor: "secondary"
                    }}
                    onClick={e => setColorMode(themeModes[colorMode].next)}
                  >
                    <Text sx={{ padding: 2 }}>{colorMode}</Text>
                  </Button>
                </Box>
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
