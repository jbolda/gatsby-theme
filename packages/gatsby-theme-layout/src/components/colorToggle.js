import React from "react";
import { Box, Button } from "theme-ui";
import { useThemeUI } from "theme-ui";

export default ({ hamburgerActive }) => {
  const { theme, colorMode, setColorMode } = useThemeUI();

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
      sx={{
        display: [hamburgerActive ? "flex" : "none", "flex", "flex"],
        padding: 0,
        margin: 2
      }}
    >
      <Button
        aria-label="color mode"
        sx={{
          px: 3,
          py: 0,
          my: -1,
          backgroundColor: "inherit",
          border: 2,
          borderStyle: "groove",
          borderColor: "secondary"
        }}
        onClick={e => setColorMode(themeList[colorMode].next)}
      >
        {colorMode}
      </Button>
    </Box>
  );
};
