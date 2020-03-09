import React from "react";
import { Flex, Box, Heading } from "theme-ui";

const Border = ({ children, ...props }) => (
  <Flex
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",

      position: "relative",
      padding: "1px",
      boxSizing: "border-box",

      background: "#000000",
      backgroundClip: "padding-box",
      border: "solid 1px transparent",
      borderRadius: "1rem",
      zIndex: 99
    }}
  >
    {children}
  </Flex>
);

export default ({ title }) => {
  return (
    <Box
      sx={{
        background: "#1b1f2a",
        padding: "1rem",
        width: "800px",
        height: "400px"
      }}
    >
      <Border>
        <Heading>{title}</Heading>
      </Border>
    </Box>
  );
};
