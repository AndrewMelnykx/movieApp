import React from "react";
import MainPage from "./components/main-page/MainPage";
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
          <MainPage />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
