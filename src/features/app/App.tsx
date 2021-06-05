import { Helmet } from "react-helmet-async";
import Layout from "features/layout/Layout";
import useEventListener from "shared/hooks/useEventListener";
import { useEffect } from "react";

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
  document.body.classList.remove("mousedown");
  if (event.key === "Escape") {
    (document?.activeElement as HTMLElement)?.blur();
  }
}

function App() {
  const metas = getMetas();

  useEffect(() => {
    if (window.location.hash) {
      const pathWithoutHash = window.location.href.split("#")[0];
      window.history.replaceState(null, "", pathWithoutHash);
    }
  }, []);

  useEventListener(window, "load", loadHandler);
  useEventListener(window, "mousedown", mouseDownHandler);
  useEventListener(window, "keydown", keyDownHandler);

  return (
    <>
      <Helmet>
        {metas.map((meta) => (
          <meta {...meta} />
        ))}
      </Helmet>
      <Layout />
    </>
  );
}

export default App;
