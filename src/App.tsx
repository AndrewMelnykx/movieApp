import React from "react";
import { Provider } from "react-redux";

import store from "@redux/store/store";
import Hero from "./components/hero";

import { ThemeProvider } from "@mui/material";
import { theme } from "@helpers/theme-font";

import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Hero />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
