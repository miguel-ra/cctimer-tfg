import { useState, useEffect } from "react";

function useMediaQuery(query: string) {
  const queryParsed = query.replace(/^@media( ?)/m, "");
  const [match, setMatch] = useState(!!window.matchMedia(queryParsed).matches);

  useEffect(() => {
    const queryList = window.matchMedia(queryParsed);
    function handler() {
      setMatch(!!queryList.matches);
    }

    queryList.addEventListener("change", handler);

    return () => {
      queryList.removeEventListener("change", handler);
    };
  }, [queryParsed]);

  return match;
}

export default useMediaQuery;
