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

function App() {
  const metas = getMetas();

  useEventListener(window, "load", () => {
    document.body.classList.add("loaded");
  });

  useEventListener(window, "mousedown", () => {
    document.body.classList.add("mousedown");
  });

  useEventListener(window, "keydown", () => {
    document.body.classList.remove("mousedown");
  });

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
