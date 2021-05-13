import { Helmet } from "react-helmet-async";
import Layout from "features/layout/Layout";
import useEventListener from "shared/hooks/useEventListener";

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

function keyDownHandler() {
  document.body.classList.remove("mousedown");
}

function App() {
  const metas = getMetas();

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
