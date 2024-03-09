import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./style.css";
import MainRoutes from "./Router/MainRoutes.jsx";
import theme from "./MuiTheme/MuiTheme.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MainRoutes>
        <CssBaseline />
        <App />
      </MainRoutes>
    </ThemeProvider>
  </React.StrictMode>
);
