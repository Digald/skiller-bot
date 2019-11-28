import React from "react";
import { useRouter } from 'next/router'
import { createGlobalStyle } from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import NavbarHome from './NavbarHome';

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
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
    html, body {
      font-family: 'Open Sans', sans-serif;
      height: 100%;
      width: 100%;
      padding: 0;
      margin: 0;
    }
`;

export default props => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <ThemeProvider theme={theme}>
      {router.pathname === "/" ? <NavbarHome /> : <Navbar />}
      {props.children}
      <GlobalStyle />
    </ThemeProvider>
  );
};
