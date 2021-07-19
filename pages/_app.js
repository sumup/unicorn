import React from "react";
import { ThemeProvider } from "emotion-theming";
import { light } from "@sumup/design-tokens";
import initAuth from "../utils/initAuth";
import "../styles/globals.css";

initAuth();

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <ThemeProvider theme={light}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
