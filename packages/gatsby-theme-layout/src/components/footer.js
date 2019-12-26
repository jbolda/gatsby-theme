import React from "react";
import {
  Flex,
  Box,
  Link,
  Text,
  SVG
} from "@jbolda/isolated-theme-ui-components";

const Footer = ({ site }) => (
  <Box
    as="footer"
    width="98%"
    sx={{
      margin: "0px",
      padding: "0px",
      flexShrink: 0,
      variant: "jboldaGatsbyTheme.layout.footer"
    }}
  >
    <Flex>
      <Box width={null} sx={{ justifyContent: "center", flexShrink: 1 }}>
        <Text>
          Made with <Heart style={{}} /> by
          {` `}
          <Link as="a" to={site.siteMetadata.siteContact}>
            <Text>{site.siteMetadata.siteAuthor}</Text>
          </Link>
        </Text>
      </Box>
    </Flex>
  </Box>
);

export default Footer;

const Heart = ({
  height = "25px",
  width = "25px",
  fill = "primary",
  style
}) => (
  <SVG
    height={height}
    width={width}
    sx={{ fill: fill, marginBottom: `-7px` }}
    style={style}
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1664 596q0-81-21.5-143t-55-98.5-81.5-59.5-94-31-98-8-112 25.5-110.5 64-86.5 72-60 61.5q-18 22-49 22t-49-22q-24-28-60-61.5t-86.5-72-110.5-64-112-25.5-98 8-94 31-81.5 59.5-55 98.5-21.5 143q0 168 187 355l581 560 580-559q188-188 188-356zm128 0q0 221-229 450l-623 600q-18 18-44 18t-44-18l-624-602q-10-8-27.5-26t-55.5-65.5-68-97.5-53.5-121-23.5-138q0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344z" />
  </SVG>
);
