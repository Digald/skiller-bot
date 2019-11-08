import React from "react";
import { createGlobalStyle } from "styled-components";
import Navbar from "./Navbar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#000"
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#fff"
    }
  }
});

const GlobalStyle = createGlobalStyle`
    html, body {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
    }
`;

export default props => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {props.children}
      <GlobalStyle />
    </ThemeProvider>
  );
};
