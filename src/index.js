import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider as StoreProvider } from "react-redux";
import store from "./store/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StoreProvider store={store}>
            {console.log(store)}
            <App />
          </StoreProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
