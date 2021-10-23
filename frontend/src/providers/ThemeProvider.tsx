import React from "react";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
} from "@material-ui/core/styles";

export interface ThemeProps extends ThemeOptions {
  navBar?: {
    main: React.CSSProperties["color"];
    selected: React.CSSProperties["color"];
    innerBorder: React.CSSProperties["color"];
    text: React.CSSProperties["color"];
  };
  paper?: {
    main: React.CSSProperties["color"];
  };
  background?: {
    main: React.CSSProperties["color"];
  };
  selectedNavbar?: {
    main: React.CSSProperties["color"];
  };
  formSectionBackground?: {
    main: React.CSSProperties["color"];
  };
  metaDataContainer?: {
    main: React.CSSProperties["color"];
  };
}

declare module "@material-ui/core/styles/createTheme" {
  interface ThemeOptions {
    navBar?: {
      main: React.CSSProperties["color"];
      selected: React.CSSProperties["color"];
      innerBorder: React.CSSProperties["color"];
      text: React.CSSProperties["color"];
    };
    paper?: {
      main: React.CSSProperties["color"];
    };
    background?: {
      main: React.CSSProperties["color"];
    };
    selectedNavbar?: {
      main: React.CSSProperties["color"];
    };
    formSectionBackground?: {
      main: React.CSSProperties["color"];
    };
    metaDataContainer?: {
      main: React.CSSProperties["color"];
    };
  }
}
// font-family: 'Noto Sans Mono', monospace;
export const theme: ThemeProps = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#61dafb",
    },
  },
  typography: {
    // eslint-disable-next-line quotes
    fontFamily: ['"Noto Sans Mono"', "monospace"].join(","),
    h5: {
      // eslint-disable-next-line quotes
      // fontFamily: ['"Ubuntu"', "Open Sans"].join(","),
      fontFamily: ['"Noto Sans Mono"', "monospace"].join(","),
      fontSize: "30px",
      color: "#5B676D",
    },
    h6: {
      // eslint-disable-next-line quotes
      // fontFamily: ['"Ubuntu"', "Open Sans"].join(",")
      fontFamily: ['"Noto Sans Mono"', "monospace"].join(","),
      fontSize: "20px",
      color: "#5B676D",
    },
    body1: {
      // eslint-disable-next-line quotes
      // fontFamily: ['"Ubuntu"', "Open Sans"].join(","),
      fontFamily: ['"Noto Sans Mono"', "monospace"].join(","),
      fontSize: "17px",
    },
    body2: {
      // eslint-disable-next-line quotes
      // fontFamily: ['"Ubuntu"', "Open Sans"].join(","),
      fontFamily: ['"Noto Sans Mono"', "monospace"].join(","),
      fontSize: "18px",
    },
  },
  background: {
    main: "#0a192f",
  },
});

export const MorphwareTheme: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
