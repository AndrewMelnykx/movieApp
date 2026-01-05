import React from "react";
import Hero from "./components/hero";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@helpers/theme-font";
import { Provider } from "react-redux";
import store from "@redux/store/store";

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
