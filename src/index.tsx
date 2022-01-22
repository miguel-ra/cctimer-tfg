import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Providers from "store/Providers";
import App from "features/app/App";
import reportWebVitals from "./reportWebVitals";
import "./i18n/i18n";

let render;
const rootElement = document.getElementById("root");

if (rootElement?.hasChildNodes()) {
  render = ReactDOM.hydrate;
} else {
  render = ReactDOM.render;
}

render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
