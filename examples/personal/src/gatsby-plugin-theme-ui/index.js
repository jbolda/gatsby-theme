import React from "react";

const headingTextStandards = {
  fontFamily: "heading",
  fontWeight: "heading",
  lineHeight: "heading"
};

const bodyTextStandards = {
  fontFamily: "body",
  fontWeight: "body",
  lineHeight: "body"
};

export default {
  initialColorMode: "light",
  useCustomProperties: true, // true is default
  // ^ prevents FOUC aka flash of unstyled content
  useColorSchemeMediaQuery: true, // turns on dark mode if set in browser
  breakpoints: ["40em", "56em", "64em"],
  space: [0, 2, 4, 8, 12, 16, 20, 24, 28],
  fonts: {
    body: "Proza Libre, system-ui, sans-serif",
    heading: "Cormorant Garamond, serif",
    monospace: "Menlo, monospace"
  },
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.98,
    heading: 1.47
  },
  colors: {
    text: "#192E29",
    background: "#F8F9FC",
    primary: "#39f1a2",
    secondary: "#5A80A1",
    muted: "#e9edf6",
    modes: {
      dark: {
        text: "#F3FBF1",
        background: "#1d2121",
        primary: "#a6e58b",
        secondary: "#363233",
        muted: "#dcf4d3"
      }
    }
  },
  text: {
    heading: {
      ...headingTextStandards,
      letterSpacing: "heading"
    },
    body: {
      ...bodyTextStandards,
      letterSpacing: "body"
    }
  },
  jboldaGatsbyTheme: {
    layout: {
      heading: {
        ...headingTextStandards,
        color: "text"
      },
      text: {
        ...bodyTextStandards,
        color: "text"
      },
      link: {
        ...bodyTextStandards,
        color: "primary"
      }
    },
    homepage: {
      landing: {
        container: {
          /* add tokens here */
        },
        left: {
          /* add tokens here */
        },
        right: {
          /* add tokens here */
        },
        heading: {
          ...headingTextStandards,
          color: "text"
        },
        text: {
          ...bodyTextStandards,
          color: "text"
        },
        link: {
          ...bodyTextStandards,
          color: "primary"
        }
      },
      about: {
        container: {
          /* add tokens here */
        },
        left: {
          /* add tokens here */
        },
        right: {
          /* add tokens here */
        },
        heading: {
          ...headingTextStandards,
          color: "text"
        },
        text: {
          ...bodyTextStandards,
          color: "text"
        },
        link: {
          ...bodyTextStandards,
          color: "primary"
        }
      },
      engagements: {
        container: {
          backgroundColor: "secondary"
        },
        each: {
          /* add tokens here */
        },
        heading: {
          ...headingTextStandards,
          color: "muted"
        },
        text: {
          ...bodyTextStandards,
          color: "muted"
        },
        link: {
          ...bodyTextStandards,
          color: "primary"
        },
        components: {
          h3: props => (
            //eslint-disable-next-line
            <h3
              {...props}
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                lineHeight: 1.47,
                color: "#e9edf6"
              }}
            />
          ),
          p: props => (
            <p
              {...props}
              style={{
                fontFamily: "Proza Libre, system-ui, sans-serif",
                fontWeight: 400,
                lineHeight: 1.98,
                color: "#e9edf6"
              }}
            />
          )
        }
      },
      articles: {
        container: {
          /* add tokens here */
        },
        each: {
          /* add tokens here */
        },
        heading: {
          ...headingTextStandards,
          color: "text"
        },
        text: {
          ...bodyTextStandards,
          color: "text"
        },
        link: {
          ...bodyTextStandards,
          color: "primary"
        }
      }
    }
  },
  styles: {
    root: {
      ...bodyTextStandards
    },
    h1: {
      color: "text",
      ...headingTextStandards,
      fontSize: 5
    },
    h2: {
      color: "text",
      ...headingTextStandards,
      fontSize: 4
    },
    h3: {
      color: "text",
      ...headingTextStandards,
      fontSize: 3
    },
    h4: {
      color: "text",
      ...headingTextStandards,
      fontSize: 2
    },
    h5: {
      color: "text",
      ...headingTextStandards,
      fontSize: 1
    },
    h6: {
      color: "text",
      ...headingTextStandards,
      fontSize: 0
    },
    p: {
      color: "text",
      ...bodyTextStandards
    },
    span: {
      color: "text",
      ...bodyTextStandards
    },
    a: {
      color: "primary",
      ...bodyTextStandards
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit"
      }
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit"
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    img: {
      maxWidth: "100%"
    }
  }
};
