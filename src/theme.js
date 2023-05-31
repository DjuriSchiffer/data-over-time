import { rem } from "polished";

const theme = {
  color: {
    key: {
      dark: "#333333",
      default: "#696969",
      light: "#F2F2F2",
      white: "#FFFFFF",
    },
    background: {
      dark: "#4D6C7E",
      default: "#CBC9AF",
      light: "#EDECDA",
      xLight: "#F4F4EF",
    },

    date: {
      dark: "#BC4242",
      default: "#C73528",
      light: "#F49090",
      xLight: "#FFF4F3",
    },
    location: {
      dark: "#406539",
      default: "#61BA3C",
      light: "#A4F482",
      xLight: "#D7E5BF",
    },
  },
  fonts: {
    number: {
      small: {
        fontFamily: "PT Serif",
        size: rem(32),
        lineHeight: rem(40),
        fontWeight: "700",
      },
      large: {},
    },
  
    largeTitle: {
      small: {
        fontFamily: "PT Serif",
        size: rem(32),
        lineHeight: rem(36),
        fontWeight: "700",
      },
      large: {
        size: rem(52),
        lineHeight: rem(48),
      },
    },
    title1: {
      small: {
        fontFamily: "PT Serif",
        size: rem(16),
        lineHeight: rem(20),
        fontWeight: "700",
      },
      large: {
        size: rem(28),
        lineHeight: rem(40),
      },
    },
    title2: {
      small: {
        fontFamily: "PT Serif",
        size: rem(16),
        lineHeight: rem(24),
        fontWeight: "700",
      },
      large: {
        size: rem(24),
        lineHeight: rem(30),
      },
    },
    title3: {
      small: {
        fontStyle: "italic",
        fontFamily: "PT Serif",
        size: rem(16),
        lineHeight: rem(24),
      },
      large: {
        size: rem(24),
        lineHeight: rem(32),
      },
    },
    title4: {
      small: {
        fontStyle: "italic",
        fontFamily: "PT Serif",
        size: rem(16),
        lineHeight: rem(24),
      },
      large: {
        size: rem(20),
        lineHeight: rem(24),
      },
    },
    title5: {
      small: {
        fontStyle: "italic",
        fontFamily: "PT Serif",
        size: rem(12),
        lineHeight: rem(16),
      },
      large: {
        size: rem(20),
        lineHeight: rem(24),
      },
    },
    title6: {
      small: {
        fontWeight: "700",
        fontFamily: "PT Serif",
        size: rem(12),
        lineHeight: rem(16),
      },
      large: {
        size: rem(16),
        lineHeight: rem(24),
      },
    },
    headline: {
      small: {
        fontFamily: "Open Sans",
        size: rem(14),
        lineHeight: rem(24),
        fontWeight: "500",
        letterSpacing: "1%",
      },
      large: {
        size: rem(24),
        lineHeight: rem(32),
      },
    },
    caption2: {
      small: {
        fontFamily: "Open Sans",
        size: rem(8),
        lineHeight: rem(16),
        fontWeight: "500",
        letterSpacing: "1%",
      },
      large: {
        size: rem(10),
      },
    },
    caption1: {
      small: {
        fontFamily: "Open Sans",
        size: rem(14),
        lineHeight: rem(16),
      },
      large: {},
    },
    body: {
      small: {
        fontFamily: "Open Sans",
        size: rem(12),
        lineHeight: rem(16),
      },
      large: {},
    },
    bodyBold: {
      small: {
        fontFamily: "Open Sans",
        size: rem(12),
        lineHeight: rem(16),
        fontWeight: "700",
      },
      large: {},
    },
    archive: {
      small: {
        fontWeight: "700",
        fontFamily: "PT Serif",
        size: rem(10),
        lineHeight: rem(16),
      },
      large: {
        size: rem(16),
        lineHeight: rem(24),
      },
    },
  },
  breakPoint: 900,
  padding: {
    outer: rem(24),
    inner: rem(16),
  },
  transition: {
    timing: ".3s",
    function: "ease",
  },
};

export default theme;
