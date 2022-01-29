import { StrictMode } from "react";
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
