import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import useEventListener from "shared/hooks/useEventListener";

import Router from "../router/Router";

import { useApp } from "./appViewModel";

function getMetas() {
  const metas = [];

  if (document.domain?.includes("beta")) {
    metas.push({ name: "robots", content: "noindex" });
  }

  return metas;
}

function loadHandler() {
  document.body.classList.add("loaded");
}

function mouseDownHandler() {
  document.body.classList.add("mousedown");
}

function keyDownHandler(event: KeyboardEvent) {
  const tagName = (event.target as HTMLElement).tagName.toLowerCase();
  if (!["input", "textarea"].includes(tagName) || event.key === "Tab") {
    document.body.classList.remove("mousedown");
  }
  if (event.key === "Escape") {
    (document?.activeElement as HTMLElement)?.blur();
  }
}

function App() {
  useApp();
  const { t } = useTranslation();
  const metas = getMetas();

  useEffect(() => {
    if (window.location.hash) {
      const pathWithoutHash = window.location.href.split("#")[0];
      window.history.replaceState(null, "", pathWithoutHash);
    }
  }, []);

  useEventListener(window, "load", loadHandler);
  useEventListener(window, "mousedown", mouseDownHandler, { useCapture: true });
  useEventListener(window, "keydown", keyDownHandler, { useCapture: true });

  const title = `${t("Professional speedcubing and trainer timer")} - CCTimer.com`;
  const description = t(
    "Rubik's Cube online timer for speedcubing. Simple but complete scramble generator, timer with sound, automatic averaging and much more!"
  );

  return (
    <>
      <Helmet>
        {metas.map((meta) => (
          <meta key={meta.name} {...meta} />
        ))}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Router />
    </>
  );
}

export default App;
