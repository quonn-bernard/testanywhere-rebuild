import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const customTheme = extendTheme({
  config,
  sections: {
    padding: {
      base: "50px 0",
    },
    content: {
      width: "90%",
      text: {
        sectionHeader: {
          fontSize: "2xl",
          fontWeight: "bold",
        },
      },
    },
  },
  buttons: {},
  icons: {
    fontSize: {
      default:"3.25rem"
    }
  },
  colors: {
    primary: "#000000",
    secondary: "#fff",
    accent: "#069e9c",
    lightAccent: "rgba(0,156,171, .1)"
  }
});
