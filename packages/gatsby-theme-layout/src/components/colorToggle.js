import React from "react";
import { Box, Text, Button } from "@jbolda/isolated-theme-ui-components";
import { useThemeUI } from "theme-ui";

export default ({ hamburgerActive }) => {
  const { theme, colorMode, setColorMode } = useThemeUI();
  console.log(theme, colorMode);
  const themeModes =
    !!theme && !!theme.colors && !!theme.colors.modes
      ? [
          !!theme && !!theme.initialColorModeName
            ? theme.initialColorModeName
            : "default"
        ].concat(Object.keys(theme.colors.modes))
      : [];

  const themeList = themeModes.reduce((modes, mode, index, array) => {
    return {
      ...modes,
      [mode]: {
        name: mode,
        next: array[index + 1 > array.length - 1 ? 0 : index + 1]
      }
    };
  }, {});

  return themeModes.length < 2 ? null : (
    <Box
      width={null}
      sx={{
        display: [hamburgerActive ? "flex" : "none", "flex", "flex"],
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
        onClick={e => setColorMode(themeList[colorMode].next)}
      >
        <Text
          sx={{
            padding: 2,
            variant: "jboldaGatsbyTheme.layout.text"
          }}
        >
          {colorMode}
        </Text>
      </Button>
    </Box>
  );
};
