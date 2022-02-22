import { StrictMode } from "react";
import "shared/firebase/app";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "features/app/App";
import Providers from "store/Providers";

import "./i18n/i18n";

ReactDOM.render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
